import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedService } from '../shared.service';
import { SignUPDTO } from '../../models/signup.dto';
import { PASSWORD_MISMATCH, SIGNUP_MANDATORY_FIELDS, NETWORK_FAILED } from '../shared.properties';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public messageType: String = 'danger';
  public message: String;
  public signUpObj: SignUPDTO;

  constructor(public bsModalRef: BsModalRef, public bsModalService: BsModalService, private sharedService: SharedService) {
    this.signUpObj = new SignUPDTO();
  }

  ngOnInit() {
  }

  openLoginModal() {
    this.bsModalService.show(LoginComponent);
    this.bsModalRef.hide();
  }

  doSignUp() {
    this.message = null;
    if (!this.signUpObj.email || !this.signUpObj.name || !this.signUpObj.password || !this.signUpObj.dob) {
      this.message = SIGNUP_MANDATORY_FIELDS;
      return;
    }
    if (this.signUpObj.password !== this.signUpObj.confirmPassword) {
      this.message = PASSWORD_MISMATCH;
      return;
    }
    this.sharedService.signup(this.signUpObj).subscribe((data) => this.onSuccess(data),
      (error) => this.handleError(error));
  }

  onSuccess(data) {
    this.openLoginModal();
  }

  handleError(error) {
    this.message = NETWORK_FAILED;
    return;
  }

}
