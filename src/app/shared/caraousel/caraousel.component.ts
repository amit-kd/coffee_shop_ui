import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-caraousel',
  templateUrl: './caraousel.component.html',
  styleUrls: ['./caraousel.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class CaraouselComponent implements OnInit {
  public images: Array<Object>;
  constructor() { }

  ngOnInit() {
    this.images = [{
      src: '../../../assets/img/coffee-1.jpg',
      caption: {
        header: 'Awsome Coffee',
        message: 'Great way to start a day!'
      }
    }, {
      src: '../../../assets/img/coffee-2.jpg',
      caption: {
        header: 'Awsome Coffee',
        message: 'Great way to start a day!'
      }
    }, {
      src: '../../../assets/img/coffee-3.jpg',
      caption: {
        header: 'Awsome Coffee',
        message: 'Great way to start a day!'
      }
    }];
  }

}
