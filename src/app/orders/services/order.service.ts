import { Injectable } from '@angular/core';
import {Order} from '../../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../auth/services/user.service';
import {mapServerResponse} from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [];

  constructor(private http: HttpClient,
              private userService: UserService) {}

  async getOrders() {
    const user = await this.userService.getUser();
    const phoneNumber = user.phoneNumber.replace('+', '');
    const result = await this.http.get(environment.api.getOrders + `?phoneNumber=%2B${phoneNumber}`).toPromise() as any;
    this.orders = (result.trades.map(item => mapServerResponse(item)) as Order[]).reverse();
    return this.orders;
  }
}
