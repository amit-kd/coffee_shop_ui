import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed: boolean = true;

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, public sharedService: SharedService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.activatedRouter.queryParams.subscribe(
      params => { params['login'] === 'true' ? this.openLoginModal(params['returnUrl']) : '' });
  }

  ngOnInit() {
  }

  openLoginModal(url) {
    this.bsModalRef = this.modalService.show(LoginComponent);
    this.sharedService.setLoginPostUrl(url);
  }

  gotoCarts() {
    if (this.sharedService.getUser().isLogged) {
      this.router.navigate(["/products"]);
    } else {
      this.openLoginModal("/products");
    }
  }

  signOut() {
    this.sharedService.signOut();
    this.router.navigate(["/home"]);
  }

}
