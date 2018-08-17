import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService {
  constructor(private http: HttpService) {

  }

  getProducts() {
    return this.http.get(environment.productUrl);
  }

}