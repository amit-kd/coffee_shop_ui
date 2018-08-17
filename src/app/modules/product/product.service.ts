import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/shared.service';
import { AngularReduxRequestOptions } from '../../core/angular-redux-request.options';

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

}