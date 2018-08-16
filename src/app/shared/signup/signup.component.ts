import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, public bsModalService: BsModalService) { }

  ngOnInit() {
  }

  openLoginModal() {
    this.bsModalService.show(LoginComponent);
    this.bsModalRef.hide();
  }

}
