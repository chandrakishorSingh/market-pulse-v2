import { Injectable } from '@angular/core';
import {Order} from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [
    { symbol: 'ADANIPOWER', date: '2020-03-12', price: 36, quantity: 40, signalType: 'sell' },
    { symbol: 'INFY', date: '2020-03-04', price: 677, quantity: 2, signalType: 'buy' },
    { symbol: 'TCS', date: '2020-05-12', price: 3, quantity: 6, signalType: 'sell' },
    { symbol: 'IDEA', date: '2020-04-12', price: 1, quantity: 240, signalType: 'buy' },
    { symbol: 'CIPLA', date: '2020-03-12', price: 39, quantity: 23, signalType: 'sell' },
  ];

  constructor() {}

  async getOrders() {
    return [...this.orders];
    // TODO: later fetch the actual orders from db
  }

  placeOrder() {
    // TODO:
  }
}
