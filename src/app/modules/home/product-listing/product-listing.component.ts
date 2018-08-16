import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';

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
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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
    this.productDetails = [{
      id: 0,
      privewImages: ['../../../assets/img/coffee-1.jpg'],
      title: 'Coffee',
      currentPrice: '180',
      quantity: 1,
      isAddedToCart: true
    }, {
      id: 1,
      privewImages: ['../../../assets/img/coffee-2.jpg'],
      title: 'Coffee',
      currentPrice: '180',
      quantity: 2,
      isAddedToCart: false
    }, {
      id: 2,
      privewImages: ['../../../assets/img/coffee-3.jpg'],
      title: 'Coffee',
      currentPrice: '180',
      quantity: 1,
      isAddedToCart: true
    }];
    this.getTotal();
  }

  onCartUpdate(item) {
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
}
