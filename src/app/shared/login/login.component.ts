import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, public bsModalService: BsModalService) { }

  ngOnInit() {
  }

  openSignUpModal() {
    this.bsModalService.show(SignupComponent);
    this.bsModalRef.hide();
  }

}
