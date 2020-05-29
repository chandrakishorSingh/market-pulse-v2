import { Injectable } from '@angular/core';

import {Push, PushObject} from '@ionic-native/push/ngx';
import {AlertController} from '@ionic/angular';
import {wait} from '../utils/utils';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../auth/services/user.service';
import {NotificationItem, User} from '../models/models';
import {formatDate} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  pushObject: PushObject;
  token: string;
  notificationItems: NotificationItem[] = [
    { symbol: 'ADANIPOWER', signalType: 'buy', createdAt: '2020-05-28', ltp: 32.42 },
    { symbol: 'ICICIBANK', signalType: 'buy', createdAt: '2020-05-28', ltp: 310.2 },
    { symbol: 'HINDUNILVR', signalType: 'sell', createdAt: '2020-05-28', ltp: 2020 },
    { symbol: 'HDFCBANK', signalType: 'buy', createdAt: '2020-05-28', ltp: 940 }
  ];

  constructor(private push: Push,
              private alertCtrl: AlertController,
              private http: HttpClient,
              private userService: UserService) {
  }

  async registerPushNotification() {
    // following line is for testing
    // this.storeDeviceToken('');

    // waiting for some time to let the app initialize
    // await wait(5000);
    this.pushObject = this.push.init({
      android: {
        senderID: '778334513091'
      }
    });
    // register the `register` handler
    this.pushObject.on('registration').subscribe(async (registration: any) => {
      this.token = registration.registrationId;
      // this.alertCtrl.create({ message: JSON.stringify(registration) }).then(al => al.present());
      this.storeDeviceToken(this.token);
    });

    this.subscribeNotificationHandler();
    this.subscribeNotificationErrorHandler();
  }

  subscribeNotificationHandler() {
    this.pushObject.on('notification').subscribe((notification: any) => {
      // TODO: redirect to transaction page
      this.alertCtrl.create({ message: JSON.stringify(notification) }).then(a => a.present());
    });
  }

  subscribeNotificationErrorHandler() {
    this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  async storeDeviceToken(token: string) {
    const user = await this.userService.getUser() as User;
    await this.http.put(environment.api.token, { deviceToken: token, phoneNumber: user.phoneNumber})
      .subscribe(res => {
        this.alertCtrl.create({ message: JSON.stringify(res) }).then(a => a.present());
      });
  }

  async getNotifications() {
    // this.notificationItems = getFromServer
    return [...this.notificationItems];
    // TODO: fetch actual notifications from db later and use pipe() to filter out all of the notification if
    // the current time is greater than 9 AM.
  }

  getNotificationItem(index: number) {
    const item = this.notificationItems[index];
    return item;
  }
}
