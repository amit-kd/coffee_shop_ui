import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule, FormsModule, AlertModule.forRoot()
  ],
  providers: [ProductService],
  declarations: [ProductDetailsComponent, ProductListingComponent]
})
export class ProductModule { }
