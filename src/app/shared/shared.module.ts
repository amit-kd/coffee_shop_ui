import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CaraouselComponent } from './caraousel/caraousel.component';
import { CarouselModule, CollapseModule, ModalModule, AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule, FormsModule, CarouselModule.forRoot(), CollapseModule.forRoot(), ModalModule.forRoot(), AlertModule.forRoot(), BsDropdownModule.forRoot(), RouterModule
  ],
  declarations: [HeaderComponent, CaraouselComponent, FooterComponent, LoginComponent, SignupComponent],
  exports: [HeaderComponent, CaraouselComponent, FooterComponent, LoginComponent, SignupComponent],
  entryComponents: [
    LoginComponent, SignupComponent
  ]
})
export class SharedModule { }
