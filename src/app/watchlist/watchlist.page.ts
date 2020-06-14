import { Component, OnInit } from '@angular/core';
import {WatchlistService} from './services/watchlist.service';
import {IonSelect, LoadingController, ModalController} from '@ionic/angular';
import {WatchlistSelectComponent} from './watchlist-select/watchlist-select.component';
import {ModalService} from '../shared-services/modal.service';
import { WatchItem} from '../models/models';
import {SortMethod, sortOptions} from '../utils/utils';

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
              private loadingCtrl: LoadingController) {}

  async ngOnInit() {
    const loadingEle = await this.loadingCtrl.create({ message: 'Loading...' });
    await loadingEle.present();

    await this.watchlistService.initializeWatchlistService();

    this.selectedWatchListName = this.watchlistService.selectedWatchlistName;
    this.watchItems = await this.watchlistService.getWatchItems(this.selectedWatchListName);
    this.watchlistService.selectedWatchlistNameSubject.subscribe(async (watchlistName) => {
      this.selectedWatchListName = watchlistName;
      this.watchItems = await this.watchlistService.getWatchItems(watchlistName);
    });

    this.sortBy = this.watchlistService.sortBy;

    loadingEle.dismiss();
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

  async onRefresh(event) {
    this.selectedWatchListName = this.watchlistService.selectedWatchlistName;
    this.watchItems = await this.watchlistService.getWatchItems(this.selectedWatchListName);
    event.target.complete();
  }

}
