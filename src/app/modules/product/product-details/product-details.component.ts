import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../../../models/product.dto';
import { NETWORK_FAILED, CART_DISABLE, LIKE_DISABLE, REMOVE_FROM_CART, REVISE_FROM_CART } from '../../../shared/shared.properties';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public productDetails: ProductDTO;
  public selectedImage: number = 0;
  private sub: any;
  public message: String;
  public messageType: String = "danger";
  public addedProductsCounts: number = 0;
  public cartDisableMessage: String;
  public likeDisableMessage: String;
  public alertDismiss: number = 5000;

  constructor(private productService: ProductService, private route: ActivatedRoute, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.productDetails = new ProductDTO();
    this.sub = this.route.params.subscribe(params => {
      let filteredItem = this.sharedService.filterCart(params['productId']);
      this.addedProductsCounts = filteredItem && filteredItem[0] ? filteredItem[0].quantity : 0;
      this.productService.getProduct(params['productId']).subscribe((data) => this.onSuccessOrder(data),
        (error) => this.handleError(error));
    });
  }

  onSuccessOrder(data) {
    if (data && Array.isArray(data.payload)) {
      this.productDetails = data.payload[0];
      this.likeDisableMessage = "";
      if (!this.sharedService.getUser().isLogged) {
        this.likeDisableMessage = LIKE_DISABLE;
      }
      this.processProduct();
    } else {
      this.handleError(null);
    }
  }

  handleError(error) {
    this.alertDismiss = 5000;
    this.message = NETWORK_FAILED;
    return;
  }

  onCartUpdate() {
    this.sharedService.addToCart(this.productDetails);
    this.addedProductsCounts += 1;
  }

  cartDisable() {
    if (this.addedProductsCounts === 4 || this.productDetails.stockCount - this.addedProductsCounts === 0 || this.productDetails.stockCount === 0) {
      this.cartDisableMessage = CART_DISABLE;
      return true;
    }
    this.cartDisableMessage = "";
    return false;
  }
  likeProduct() {
    this.productDetails.isLiked = !this.productDetails.isLiked;
    //do service call
  }

  processProduct() {
    let removeFromCartItem = [];
    let reviseCartItem = []
    let finalMsg = "";
    const prod = this.productDetails;
    let addedProd = this.sharedService.filterCart(prod.id);
    if (addedProd && addedProd[0]) {
      //out of stock
      if (prod.stockCount === 0) {
        removeFromCartItem.push(addedProd[0].title);
        this.sharedService.removeFromCart(addedProd[0]);
      }
      //for lesser stock
      if (prod.stockCount < addedProd[0].quantity) {
        reviseCartItem.push(addedProd[0].title);
        prod.quantity = addedProd[0].quantity - prod.stockCount;
        this.sharedService.removeFromCart(prod);
        prod.quantity = prod.stockCount;
      }
      //for more stock
      prod.quantity = addedProd[0].quantity;
      if (prod.quantity === 0) {
        prod.quantity = 1;
      }
    }
    if (removeFromCartItem.length > 0) {
      finalMsg += removeFromCartItem.join() + REMOVE_FROM_CART;
    }
    if (reviseCartItem.length > 0) {
      finalMsg += reviseCartItem.join() + REVISE_FROM_CART;
    }
    if (finalMsg) {
      this.message = finalMsg;
      this.alertDismiss = 0;
    }
  }

  ngOnDestroy() {
    this.sub = null;
  }
}
