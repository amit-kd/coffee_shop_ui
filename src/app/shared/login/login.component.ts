import { Component, OnInit, NgModule } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { SharedService } from '../shared.service';
import { SignUPDTO } from '../../models/signup.dto';
import { LOGIN_MANDATORY_FIELDS, NETWORK_FAILED } from '../shared.properties';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public messageType: String = 'danger';
  public message: String;
  public signUpObj: SignUPDTO;
  constructor(public bsModalRef: BsModalRef, public bsModalService: BsModalService, private sharedService: SharedService, private router: Router) {
    this.signUpObj = new SignUPDTO();
  }

  ngOnInit() {
  }

  openSignUpModal() {
    this.bsModalService.show(SignupComponent);
    this.bsModalRef.hide();
  }


  doLogin(f: NgForm) {
    this.message = null;
    if (!this.signUpObj.email || !this.signUpObj.password) {
      this.message = LOGIN_MANDATORY_FIELDS;
      return;
    }
    this.sharedService.getToken(this.signUpObj).subscribe((data) => this.onSuccessToken(data),
      (error) => this.handleError(error));
  }

  onSuccessToken(data) {
    localStorage.setItem("access_token", data.access_token);
    this.sharedService.login(this.signUpObj).subscribe((data) => this.onSuccess(data),
      (error) => this.handleError(error));

  }
  onSuccess(data) {
    let url = this.sharedService.getLoginPostUrl();
    if (data && data.payload && data.payload[0]) {
      localStorage.setItem("userId", data.payload[0].id);
      localStorage.setItem("userName", data.payload[0].name);
      this.sharedService.refreshUserInfo();
      this.bsModalRef.hide();
      if (url) {
        this.router.navigate([url]);
      }
      this.sharedService.setLoginPostUrl(null);
    } else {
      this.handleError(null);
    }
  }

  handleError(error) {
    this.message = NETWORK_FAILED;
    return;
  }

}
