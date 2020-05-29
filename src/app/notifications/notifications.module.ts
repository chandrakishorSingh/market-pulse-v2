import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import {NotificationItemComponent} from "./notification-item/notification-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule
  ],
  declarations: [
    NotificationsPage,
    NotificationItemComponent
  ]
})
export class NotificationsPageModule {}
