import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { NETWORK_FAILED } from '../../../shared/shared.properties';
import { OrderDTO } from '../../../models/order.dto';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public orderDetails: Array<OrderDTO>;

  public message: String;
  public orderStatuses: object;
  public messageType: String = "danger";
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderStatuses = {
      SAVED: "Saved",
      CONFIRMING: "Confirming",
      PREPARING: "Preparing",
      OUT_FOR_DELIVERY: "Out for delivery",
      DELIVERED: "Delivered"
    };
    this.orderDetails = [];
    this.orderService.getOrders().subscribe((data) => this.onSuccess(data),
      (error) => this.handleError(error));

  }

  openOrder(order) {
    this.router.navigate(['/order', order.id]);
  }

  onSuccess(data) {
    if (data && Array.isArray(data.payload)) {
      this.orderDetails = data.payload;
    } else {
      this.handleError(null);
    }

  }

  handleError(error) {
    this.message = NETWORK_FAILED;
    return;
  }

}
