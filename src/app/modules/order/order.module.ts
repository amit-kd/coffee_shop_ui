import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { OrderService } from './order.service';

@NgModule({
  imports: [
    CommonModule, AlertModule.forRoot()
  ],
  declarations: [OrderHistoryComponent],
  providers: [OrderService]
})
export class OrderModule { }