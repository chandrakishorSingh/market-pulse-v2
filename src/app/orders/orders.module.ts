import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import {OrderItemComponent} from './order-item/order-item.component';
import {OrderService} from "./services/order.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  declarations: [
    OrdersPage,
    OrderItemComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrdersPageModule {}
