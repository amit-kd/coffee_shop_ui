import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/shared.service';
import { JwtInterceptor } from '../../core/authnication/http-interceptor';
import { AngularReduxRequestOptions } from '../../core/angular-redux-request.options';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpService, private sharedService: SharedService) { }


  getOrders() {
    return this.http.get(environment.orderUrl + "/" + this.sharedService.getUser().id, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }
}
