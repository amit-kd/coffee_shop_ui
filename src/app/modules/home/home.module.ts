import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule
  ],
  declarations: [WelcomeComponent]
})
export class HomeModule { }
