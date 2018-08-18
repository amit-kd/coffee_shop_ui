import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { environment } from '../../environments/environment';
import { LOGIN_PARAMS, LOGIN_PARAMS_PASSWORD, CLIENT_SECRET } from './shared.properties';
import { SignUPDTO } from '../models/signup.dto';
import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { UserDTO } from '../models/user.dto';
import { ProductDTO } from '../models/product.dto';
import { Utility } from '../core/Utils/utility';
import { OrderDTO } from '../models/order.dto';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private user: UserDTO;
  private loginPostUrl: String;
  private cartItems: Array<ProductDTO>;
  private editedOrder: OrderDTO;
  constructor(private http: HttpService) {
    this.refreshUserInfo();
    this.refreshCart();
    this.refreshEditedOrder();
  }

  getToken(signupDTO: SignUPDTO) {
    return this.http.post(environment.tokenUrl + LOGIN_PARAMS + signupDTO.email + LOGIN_PARAMS_PASSWORD + signupDTO.password, {}, new AngularReduxRequestOptions().getLoginRequestOptions(btoa(CLIENT_SECRET)));
  }

  login(signupDTO: SignUPDTO) {
    return this.http.post(environment.loginUrl, signupDTO, new AngularReduxRequestOptions().getAuthorizedRequestOptions());
  }

  signup(signupDTO: SignUPDTO) {
    return this.http.post(environment.signupUrl, signupDTO);
  }

  getUser() {
    return this.user;
  }
  getUserIdIfNull() {
    return this.getUser().id ? this.getUser().id : " ";
  }

  setUserName(name) {
    this.user.name = name;
  }

  getLoginPostUrl() {
    return this.loginPostUrl;
  }

  setLoginPostUrl(url) {
    this.loginPostUrl = url;
  }

  refreshUserInfo() {
    this.user = new UserDTO();
    if (localStorage.getItem("userName")) {
      this.user.isLogged = true;
      this.user.id = localStorage.getItem("userId");
      this.user.name = localStorage.getItem("userName");
    }
  }

  addToCart(item) {
    let filteredItem = this.filterCart(item.id);
    if (filteredItem[0]) {
      filteredItem[0].quantity += item.quantity;
    } else {
      this.cartItems.push(Utility.deepClone(item));
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(item) {
    let filteredItem = this.filterCart(item.id);
    if (filteredItem[0] && filteredItem[0].quantity > 0) {
      filteredItem[0].quantity -= item.quantity;
    }
    if (filteredItem[0].quantity === 0) {
      this.cartItems.splice(this.cartItems.indexOf(filteredItem[0]), 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartSize() {
    let count: number = 0;
    this.cartItems.map(prod => {
      count += prod.quantity;
    });
    return count;
  }

  filterCart(id) {
    return this.cartItems.filter(prod => prod.id === id);
  }

  clearCart() {
    localStorage.removeItem('cartItems');
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  }

  getCart() {
    return this.cartItems;
  }

  setEditedOrder(order) {
    this.editedOrder = order;
    localStorage.setItem("editedOrder", JSON.stringify(order));
  }

  getEditedOrder() {
    return this.editedOrder;
  }

  clearEditedOrder() {
    localStorage.removeItem("editedOrder");
    this.editedOrder = new OrderDTO;
  }

  clearUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    this.user = new UserDTO();
  }

  refreshEditedOrder() {
    this.editedOrder = localStorage.getItem('editedOrder') ? JSON.parse(localStorage.getItem('editedOrder')) : new OrderDTO();
  }

  signOut() {
    this.clearEditedOrder();
    this.clearCart();
    this.clearUser();
    localStorage.clear();

  }

}
