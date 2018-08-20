import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { OrderService } from './order.service';
import { OrderFilterPipe } from '../../shared/order-filter.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, AlertModule.forRoot(), FormsModule
  ],
  declarations: [OrderHistoryComponent, OrderFilterPipe],
  providers: [OrderService]
})
export class OrderModule { }