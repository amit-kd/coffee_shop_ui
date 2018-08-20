import { Pipe, PipeTransform } from '@angular/core';
import { OrderDTO } from '../models/order.dto';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(orders: OrderDTO[], args?: any): any {
    if (!orders) return [];
    if (!args) return orders;
    return orders.filter(order => order.id.includes(args));
  }

}
