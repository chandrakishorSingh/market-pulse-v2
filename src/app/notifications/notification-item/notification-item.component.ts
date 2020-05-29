import {Component, Input, OnInit} from '@angular/core';
import {NotificationItem, PortfolioItem} from "../../models/models";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {

  @Input() notificationItem: NotificationItem;

  constructor() {}

  ngOnInit() {}

}
