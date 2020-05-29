import { Component, OnInit } from '@angular/core';
import {WatchlistService} from './services/watchlist.service';
import {IonSelect, ModalController} from '@ionic/angular';
import {WatchlistSelectComponent} from './watchlist-select/watchlist-select.component';
import {ModalService} from '../shared-services/modal.service';
import { WatchItem} from '../models/models';
import {SortMethod, sortOptions} from '../utils/utils';
import {NotificationService} from "../shared-services/notification.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {

  selectedWatchListName: string;
  sortBy: SortMethod;
  sortOptions = sortOptions;

  watchItems: WatchItem[] = [];

  constructor(private watchlistService: WatchlistService,
              private modalService: ModalService,
              private modalCtrl: ModalController,
              private pushService: NotificationService) {}

  ngOnInit() {
    this.selectedWatchListName = this.watchlistService.selectedWatchlistName;
    this.watchItems = this.watchlistService.getWatchItems(this.selectedWatchListName);
    this.watchlistService.selectedWatchlistNameSubject.subscribe((watchlistName) => {
      this.selectedWatchListName = watchlistName;
      this.watchItems = this.watchlistService.getWatchItems(watchlistName);
    });
    this.sortBy = this.watchlistService.sortBy;
  }

  async onSelectWatchList() {
    this.modalService.openModal();

    await this.modalCtrl.create({ component: WatchlistSelectComponent })
      .then(page => {
        page.style.marginTop = '40%';
        return page;
      }).then(page => page.present());
  }

  onSortByOpen(selectRef: IonSelect) {
    selectRef.okText = 'apply';
    selectRef.open();
  }

  onSortBy(event: CustomEvent) {
    const sortMethod = event.detail.value;
    this.watchItems = this.watchlistService.sortWatchItems(sortMethod);
  }

}
