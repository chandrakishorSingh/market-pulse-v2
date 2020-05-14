import { Component, Input, OnInit, Renderer2} from '@angular/core';
import {WatchItem} from '../../models/models';

@Component({
  selector: 'app-watch-item',
  templateUrl: './watch-item.component.html',
  styleUrls: ['./watch-item.component.scss'],
})
export class WatchItemComponent implements OnInit {

  @Input() watchItem: WatchItem;

  constructor() {}

  ngOnInit() {}

  formatPriceChange(change: number) {
    return change > 0 ? change : '- ' + Math.abs(change);
  }
}
