import { Component, OnInit } from '@angular/core';
import {NotificationItem, PortfolioItem} from '../models/models';
import {NotificationService} from '../shared-services/notification.service';
import {IonInput} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  allNotificationItems: NotificationItem[] = [];
  listedNotificationItems: NotificationItem[] = [];
  isSearching = false;

  constructor(private notificationService: NotificationService,
              private router: Router) {}

  async ngOnInit() {
    this.allNotificationItems = await this.notificationService.getNotifications();
    this.listedNotificationItems = this.allNotificationItems;
  }

  onSearch() {
    this.isSearching = true;
  }

  async onCancel(inputRef: IonInput) {
    inputRef.value = '';
    await inputRef.setFocus();
    this.isSearching = false;
    this.listedNotificationItems = this.allNotificationItems;
  }

  onInputChange(event: CustomEvent) {
    const symbol = event.detail.value.toUpperCase();
    this.listedNotificationItems = this.allNotificationItems.filter(order => order.symbol.startsWith(symbol));
  }

  onNotificationItemClick(notificationItem: NotificationItem, index: number) {
    const signalType = notificationItem.signalType;
    this.router.navigate(['/', 'home', 'tabs', 'transaction', signalType, index]);
  }

}
