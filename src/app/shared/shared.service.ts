import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { environment } from '../../environments/environment';
import { LOGIN_PARAMS, LOGIN_PARAMS_PASSWORD, CLIENT_SECRET } from './shared.properties';
import { SignUPDTO } from '../models/signup.dto';
import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private user: UserDTO;
  private loginPostUrl: String;
  public cartItems: Array<Object>;
  constructor(private http: HttpService) {
    this.refreshUserInfo();
    this.cartItems = [];
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


}
