import {Injectable} from '@angular/core';

import {Push, PushObject} from '@ionic-native/push/ngx';
import {AlertController} from '@ionic/angular';
import {mapServerResponse} from '../utils/utils';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../auth/services/user.service';
import {NotificationItem, User} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  pushObject: PushObject;
  token: string;
  notificationItems: NotificationItem[] = [];

  constructor(private push: Push,
              private alertCtrl: AlertController,
              private http: HttpClient,
              private userService: UserService) {
  }

  async registerPushNotification() {
    this.pushObject = this.push.init({
      android: {
        senderID: environment.senderID
      }
    });
    // register the `register` handler
    this.pushObject.on('registration').subscribe(async (registration: any) => {
      this.token = registration.registrationId;
      this.storeDeviceToken(this.token);
    });

    this.subscribeNotificationHandler();
    this.subscribeNotificationErrorHandler();
  }

  subscribeNotificationHandler() {
    this.pushObject.on('notification').subscribe((notification: any) => {
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
    const user = await this.userService.getUser();
    const phoneNumber = user.phoneNumber.replace('+', '');
    const result = await this.http.get(environment.api.getNotifications + `?phoneNumber=%2B${phoneNumber}`).toPromise() as any;
    const notifications = result.notifications.Notifications.map((item) => mapServerResponse(item)) as NotificationItem[];
    // user can only place a order before 8AM of next trading day and after 6PM of current trading day.
    this.notificationItems = notifications.filter(() => new Date().getHours() < 8 || new Date().getHours() > 18);
    return [...this.notificationItems];
  }

  getNotificationItem(index: number) {
    return this.notificationItems[index];
  }
}
