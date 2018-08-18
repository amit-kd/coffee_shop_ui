import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/shared.service';
import { AngularReduxRequestOptions } from '../../core/angular-redux-request.options';
import { OrderDTO } from '../../models/order.dto';

@Injectable()
export class ProductService {
  constructor(private http: HttpService, private sharedService: SharedService) {

  }

  getProducts() {
    return this.http.get(environment.productUrl);
  }

  getProduct(id) {
    return this.http.get(environment.productUrl + "/" + this.sharedService.getUserIdIfNull() + "/" + id);
  }

  getOrderDetails(id) {
    return this.http.get(environment.orderUrl + "/" + this.sharedService.getUser().id + "/" + id, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }

  updateOrder(order) {
    let url = environment.updateOrderUrl + "/" + this.sharedService.getUser().id;
    return this.http.post(url, order, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }

  postOrder(order: OrderDTO) {
    let url = environment.orderUrl + "/" + this.sharedService.getUser().id;
    return this.http.post(url, order, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }

  setLike(id) {
    let url = environment.productUrl + "/" + this.sharedService.getUser().id + "/" + id;
    return this.http.post(url, {}, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }

}