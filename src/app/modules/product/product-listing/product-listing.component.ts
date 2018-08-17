import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { SignUPDTO } from '../../../models/signup.dto';
import { ProductService } from '../product.service';
import { NETWORK_FAILED } from '../../../shared/shared.properties';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  public productDetails: Array<Object>;
  public total: number = 0;
  public isEditable: boolean = true;
  private orderStatuses: Object;
  public orderStatus: string = 'DELIVERED';
  public orderId: number;
  private sub: any;
  public message: String;
  public messageType: String = "danger";

  constructor(private router: Router, private route: ActivatedRoute, public sharedService: SharedService, private productService: ProductService) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => this.onSuccess(data),
      (error) => this.handleError(error));


    this.sub = this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        //get order details and based on order status make editable
        this.isEditable = false;
      }
    });
    this.orderStatuses = {
      SAVED: 1,
      CONFIRMING: 2,
      PREPARING: 3,
      OUT_FOR_DELIVERY: 4,
      DELIVERED: 5
    };
    this.productDetails = [];
    this.getTotal();
  }

  onCartUpdate(item) {
    if (!item.isAddedToCart) {
      this.sharedService.cartItems.push(item);
    } else {
      this.sharedService.cartItems.splice(this.sharedService.cartItems.indexOf(item), 1);
    }
    item.isAddedToCart = !item.isAddedToCart;


    this.getTotal();
  }

  getTotal() {
    this.total = 0;
    this.productDetails.forEach(element => {
      if (element['isAddedToCart'])
        this.total += element['quantity'] * parseFloat(element['currentPrice']);
    });
    return this.total;
  }
  gotoProductDetails(item) {
    this.router.navigate(['/product', item.id]);
  }


  onSuccess(data) {
    if (data && Array.isArray(data.payload)) {
      this.productDetails = data.payload;
    } else {
      this.handleError(null);
    }

  }

  handleError(error) {
    this.message = NETWORK_FAILED;
    return;
  }
}
