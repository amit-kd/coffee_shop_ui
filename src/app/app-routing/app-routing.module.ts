import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../modules/home/welcome/welcome.component';
import { ProductDetailsComponent } from '../modules/home/product-details/product-details.component';
import { ProductListingComponent } from '../modules/home/product-listing/product-listing.component';
import { OrderHistoryComponent } from '../modules/home/order-history/order-history.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'products', component: ProductListingComponent },
  { path: 'order/:orderId', component: ProductListingComponent },
  { path: 'orders', component: OrderHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }