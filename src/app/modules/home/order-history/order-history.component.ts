import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public orderDetails: Array<Object>;
  constructor(private router: Router) { }

  ngOnInit() {
    this.orderDetails = [{
      id: '1',
      products: ['Coffee'],
      date: '12/12/2018',
      time: '12:00 PM',
      total: '360',
      status: 'Saved'
    }, {
      id: '2',
      products: ['Coffee'],
      date: '12/12/2018',
      time: '12:00 AM',
      total: '360',
      status: 'Confirming'
    }, {
      id: '3',
      products: ['Coffee'],
      date: '12/12/2018',
      time: '12:00 PM',
      total: '360',
      status: 'Preparing'
    }, {
      id: '4',
      products: ['Coffee'],
      date: '12/12/2018',
      time: '12:00 AM',
      total: '360',
      status: 'Out for delivery'
    }];
  }
  openOrder(order) {
    this.router.navigate(['/order', order.id]);
  }

}
