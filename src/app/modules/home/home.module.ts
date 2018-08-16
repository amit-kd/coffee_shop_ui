import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule
  ],
  declarations: [WelcomeComponent, ProductDetailsComponent, ProductListingComponent, OrderHistoryComponent]
})
export class HomeModule { }
