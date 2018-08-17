import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../modules/home/welcome/welcome.component';
import { OrderHistoryComponent } from '../modules/order/order-history/order-history.component';
import { ProductDetailsComponent } from '../modules/product/product-details/product-details.component';
import { ProductListingComponent } from '../modules/product/product-listing/product-listing.component';
import { AuthGuard } from '../core/authnication/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'products', component: ProductListingComponent },
  { path: 'order/:orderId', component: ProductListingComponent },
  { path: 'orders', component: OrderHistoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }