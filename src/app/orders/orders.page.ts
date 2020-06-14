import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Order} from '../models/models';
import {OrderService} from './services/order.service';
import {IonInput, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  allOrders: Order[] = [];
  listedOrders: Order[] = [];
  isSearching = false;

  constructor(private orderService: OrderService) {}

  async ionViewWillEnter() {
    this.allOrders = await this.orderService.getOrders();
    this.listedOrders = this.allOrders;
  }

  async onRefresh(event) {
    await this.ionViewWillEnter();
    event.target.complete();
  }

  ngOnInit() {}

  onOrderSearch() {
    this.isSearching = true;
  }

  async onCancel(inputRef: IonInput) {
    inputRef.value = '';
    await inputRef.setFocus();
    this.isSearching = false;
    this.listedOrders = this.allOrders;
  }

  onInputChange(event: CustomEvent) {
    const symbol = event.detail.value.toUpperCase();
    this.listedOrders = this.allOrders.filter(order => order.symbol.startsWith(symbol));
  }

}
