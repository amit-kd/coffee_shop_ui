import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails: Object;
  public selectedImage: number = 0;
  constructor() { }

  ngOnInit() {
    this.productDetails = {
      title: 'Coffee',
      privewImages: ['../../../assets/img/coffee-1.jpg', '../../../assets/img/coffee-2.jpg', '../../../assets/img/coffee-3.jpg'],
      rating: '4',
      noOfReviews: '41',
      description: 'Best coffee of the world!',
      currentPrice: '180',
      enjoyedPercentage: '91',
      noOfVotes: '81',
      thresholdStockCount: 4,
      stockCount: 10,
      isLiked: true,
      quantity: 10
    };
  }

}
