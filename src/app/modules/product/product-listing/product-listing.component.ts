import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { SignUPDTO } from '../../../models/signup.dto';
import { ProductService } from '../product.service';
import { NETWORK_FAILED, REMOVE_FROM_CART, REVISE_FROM_CART, CLEAR_CART, CLEAR_CART_ORDER } from '../../../shared/shared.properties';
import { ProductDTO } from '../../../models/product.dto';
import { THIS_EXPR } from '../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { OrderDTO } from '../../../models/order.dto';
import { Utility } from '../../../core/Utils/utility';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  public productDetails: Array<ProductDTO>;
  public total: number = 0;
  public isEditable: boolean = true;
  public orderStatuses: Object;
  public orderStatus: string = 'SAVED';
  public orderId: number;
  private sub: any;
  public message: String;
  public messageType: String = "danger";
  public isOrderDetails = false;
  public alertDismiss: number = 5000;
  public curOrder: OrderDTO;
  public minDate: String;
  public maxDate: String;

  constructor(private router: Router, private route: ActivatedRoute, public sharedService: SharedService, private productService: ProductService) {
    this.message = null;
  }

  ngOnInit() {
    this.minDate = Utility.getDateInFormat(null);
    //Set 3 year till order can be created
    this.maxDate = Utility.getDateInFormat(3);
    this.curOrder = new OrderDTO();
    this.sharedService.getEditedOrder().date = this.minDate;
    this.sharedService.getEditedOrder().time = Utility.getDateInFormat(null, true);
    this.orderStatuses = {
      SAVED: 1,
      CONFIRMING: 2,
      PREPARING: 3,
      OUT_FOR_DELIVERY: 4,
      DELIVERED: 5
    };
    this.productDetails = [];
    this.sub = this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        //get order details and based on order status make editable
        this.isOrderDetails = true;
        this.isEditable = false;
        this.productService.getOrderDetails(this.orderId).subscribe((data) => this.onSuccessOrder(data),
          (error) => this.handleError(error));
      }
      else {
        //List product details
        this.isOrderDetails = false;
        this.productService.getProducts().subscribe((data) => this.onSuccessProduct(data),
          (error) => this.handleError(error));
      }
    });
  }

  onCartUpdate(item) {
    if (!item.isAddedToCart) {
      this.sharedService.addToCart(item);
    } else {
      this.sharedService.removeFromCart(item);
      if (item.quantity === 0) {
        item.quantity = 1;
      }
    }
    item.isAddedToCart = !item.isAddedToCart;
    this.getTotal();
  }

  getTotal() {
    this.total = 0;
    this.productDetails.forEach(prod => {
      if (prod.isAddedToCart)
        this.total += prod.quantity * parseFloat(prod.currentPrice.toString());
    });
    return this.total;
  }
  gotoProductDetails(item) {
    this.router.navigate(['/product', item.id]);
  }

  onSuccessProduct(data) {
    if (data && Array.isArray(data.payload)) {
      this.productDetails = data.payload;
      this.processProduct();
      this.getTotal();
    } else {
      this.handleError(null);
    }
  }

  onSuccessOrder(data) {
    if (data && Array.isArray(data.payload) && data.payload[0] && Array.isArray(data.payload[0].products)) {
      this.productDetails = data.payload[0].products;
      this.orderStatus = data.payload[0].status;
      this.processOrder(data.payload[0]);
    } else {
      this.handleError(null);
    }
  }

  onSuccessPostOrder(data) {
    if (data && Array.isArray(data.payload) && data.payload[0]) {
      this.sharedService.clearCart();
      this.sharedService.clearEditedOrder();
      this.router.navigate(['/orders']);
    } else {
      this.handleError(null);
    }
  }

  processProduct() {
    let removeFromCartItem = [];
    let reviseCartItem = []
    let finalMsg = "";
    for (let i = 0; i < this.productDetails.length; i++) {
      const prod = this.productDetails[i];
      let addedProd = this.sharedService.filterCart(prod.id);
      if (addedProd && addedProd[0]) {
        prod.isAddedToCart = true;
        //out of stock
        if (prod.stockCount === 0) {
          removeFromCartItem.push(addedProd[0].title);
          this.sharedService.removeFromCart(addedProd[0]);
          continue;
        }
        //for lesser stock
        if (prod.stockCount < addedProd[0].quantity) {
          debugger;
          reviseCartItem.push(addedProd[0].title);
          prod.quantity = addedProd[0].quantity - prod.stockCount;
          this.sharedService.removeFromCart(prod);
          prod.quantity = prod.stockCount;
          continue;
        }
        //for more stock
        prod.quantity = addedProd[0].quantity;
        if (prod.quantity === 0) {
          prod.quantity = 1;
        }
      }
    }
    if (removeFromCartItem.length > 0) {
      finalMsg += removeFromCartItem.join() + REMOVE_FROM_CART;
    }
    if (reviseCartItem.length > 0) {
      finalMsg += reviseCartItem.join() + REVISE_FROM_CART;
    }
    if (finalMsg) {
      this.messageType = "danger";
      this.message = finalMsg;
      this.alertDismiss = 0;
    }
  }

  processOrder(order) {
    if (this.orderStatus === 'SAVED') {
      this.isEditable = true;
      this.curOrder = new OrderDTO();
      this.sharedService.setEditedOrder(order);
      this.sharedService.clearCart();
      this.messageType = "danger";
      this.message = CLEAR_CART;
      this.alertDismiss = 0;
    } else {
      this.total = order.total;
      this.curOrder = order;
    }
    this.productDetails.forEach(prod => {
      //To not show any out of stock / less stock message
      if (this.orderStatus !== 'SAVED') {
        prod.stockCount = Infinity;
      }
      else {
        //for SAVED secnario reload the cart        
        this.sharedService.addToCart(prod);
        prod.isAddedToCart = true;
      }
    });
    if (this.orderStatus === 'SAVED') {
      this.getTotal();
    }
  }

  postOrder(isSubmit) {
    let order = this.sharedService.getEditedOrder();
    if (this.sharedService.getEditedOrder().id) {
      this.productService.updateOrder(new OrderDTO(order.id.toString(), order.date.toString(), order.time.toString(), this.sharedService.getCart(), "SAVED", this.total.toString(), isSubmit)).subscribe((data) => this.onSuccessPostOrder(data),
        (error) => this.handleError(error));
      return;
    }
    this.productService.postOrder(new OrderDTO(null, order.date.toString(), order.time.toString(), this.sharedService.getCart(), "SAVED", this.total.toString(), isSubmit)).subscribe((data) => this.onSuccessPostOrder(data),
      (error) => this.handleError(error));
  }

  clearCart() {
    this.curOrder = new OrderDTO();
    this.sharedService.clearCart();
    this.sharedService.clearEditedOrder();
    this.productDetails.forEach(prod => prod.isAddedToCart = false);
    this.message = CLEAR_CART_ORDER;
    this.isOrderDetails = false;
    this.messageType = "success";
    this.alertDismiss = 5000;
  }


  handleError(error) {
    this.alertDismiss = 5000;
    this.messageType = "danger";
    this.message = NETWORK_FAILED;
    return;
  }



  ngOnDestroy() {
    this.sub = null;
  }
}
