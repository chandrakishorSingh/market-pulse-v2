import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, Subject} from 'rxjs';

import {IWatchlist, WatchItem} from '../../models/models';
import {environment} from '../../../environments/environment';
import {extractSymbols, SortMethod, sortOptions, toTitleCase} from '../../utils/utils';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  selectedWatchlistName: string;
  selectedWatchlistNameSubject = new Subject<string>();
  sortOptions = sortOptions;
  sortBy: SortMethod = 'alphabetically';

  watchLists: IWatchlist[] = [
    { name: 'Favourites', symbols: ['ITC', 'INFY', 'TECHM'] },
    { name: 'Oil', symbols: ['BPCL', 'GAIL'] },
    { name: 'Telecom', symbols: ['BHARTIARTL', 'IDEA'] },
    { name: 'Banks', symbols: ['INDUSINDBK', 'ICICIBANK', 'HDFC'] },
    { name: 'Medicine', symbols: ['SUNPHARMA'] },
  ];
  watchItems: WatchItem[] = [
    new WatchItem('SUNPHARMA', 464.45, 477.45),
    new WatchItem('HDFC', 87.90, 87.40),
    new WatchItem('ITC', 182.05, 182.15),
    new WatchItem('INFY', 715.50, 673),
  ];

  constructor(private http: HttpClient,
              private storage: Storage) {
    // store the watchlists in device: intended for first time open
    this.storage.ready().then(async () => {
      if (await this.hasWatchlistNative()) {
        this.watchLists = await this.storage.get('watchlists');
        this.selectedWatchlistName = await this.storage.get('selectedWatchlistName');
      } else {
        await this.storage.set('watchlists', this.watchLists);
        this.selectedWatchlistName = this.watchLists[0].name;
        await this.storage.set('selectedWatchlistName', this.selectedWatchlistName);
      }
      this.selectedWatchlistNameSubject.next(this.selectedWatchlistName);
    });
  }

  async hasWatchlistNative() {
    return await this.storage.get('watchlists');
  }

  getWatchLists() {
    return [...this.watchLists];
  }

  getWatchListByName(name: string) {
    return this.watchLists.find(item => item.name === name);
  }

  createNewWatchList(name: string) {
    name = toTitleCase(name);
    this.watchLists.push({ name, symbols: [] });

    this.selectedWatchlistName = name;
    this.selectedWatchlistNameSubject.next(name);

    this.storage.set('watchlists', this.watchLists);
  }

  async addSymbolToWatchList(name: string, symbol: string) {
    const watchlist = this.getWatchListByName(name);
    watchlist.symbols.push(symbol);
    await this.saveWatchlist(watchlist);
  }

  async removeSymbolFromWatchlist(name: string, oldSymbol: string) {
    const watchlist = this.getWatchListByName(name);
    watchlist.symbols = watchlist.symbols.filter(symbol => symbol !== oldSymbol);
    await this.saveWatchlist(watchlist);
  }

  getSymbols(): Promise<string[]> {
    return this.http.get<{ symbols: string[] }>(environment.api.getSymbols).pipe(extractSymbols()).toPromise();
  }

  selectWatchlist(watchlistName: string) {
    this.selectedWatchlistName = watchlistName;
    this.watchItems = this.getWatchItems(watchlistName);
    this.selectedWatchlistNameSubject.next(this.selectedWatchlistName);
    this.storage.set('selectedWatchlistName', this.selectedWatchlistName);
  }

  getWatchItems(watchlistName: string): WatchItem[] {
    return this.sortWatchItems(this.sortBy);
    // TODO: later fetch the results from backend
  }

  sortWatchItems(sortMethod: SortMethod) {
    this.sortBy = sortMethod;
    switch (sortMethod) {
      case 'alphabetically':
        return this.watchItems.sort((a, b) => a.symbol.localeCompare(b.symbol));
      case 'reverse-alphabetically':
        return this.watchItems.sort((a, b) => a.symbol.localeCompare(b.symbol)).reverse();
      case 'percentage':
        return this.watchItems.sort((a, b) => a.changePercentage - b.changePercentage).reverse();
      case 'reverse-percentage':
        return this.watchItems.sort((a, b) => a.changePercentage - b.changePercentage);
      case 'price':
        return this.watchItems.sort((a, b) => a.latestPrice - b.latestPrice).reverse();
      case 'reverse-price':
        return this.watchItems.sort((a, b) => a.latestPrice - b.latestPrice);
      default:
        return this.watchItems;
    }
  }

  async deleteWatchlist(name: string) {
    // check if the specified watchlist is currently selected
    const isSelected = this.selectedWatchlistName === name;
    this.watchLists = this.watchLists.filter(item => item.name !== name);
    await this.storage.set('watchlists', this.watchLists);
    // make the first watchlist the selected one if the current one is deleted
    if (isSelected) {
      this.selectedWatchlistName = this.watchLists[0].name;
      this.selectedWatchlistNameSubject.next(this.selectedWatchlistName);
    }
  }

  async renameWatchlist(oldName: string, newName: string) {
    const watchlist = this.watchLists.find(item => item.name === oldName);
    watchlist.name = newName;
    if (oldName === this.selectedWatchlistName) {
      this.selectedWatchlistName = watchlist.name;
      await this.storage.set('selectedWatchlistName', this.selectedWatchlistName);
      this.selectedWatchlistNameSubject.next(this.selectedWatchlistName);
    }
    await this.storage.set('watchlists', this.watchLists);
  }

  async saveWatchlist(newWatchlist: IWatchlist) {
    this.watchLists = this.watchLists.filter(watchlist => watchlist.name !== newWatchlist.name);
    this.watchLists.push(newWatchlist);
    await this.storage.set('watchlists', this.watchLists);
    this.selectedWatchlistNameSubject.next(this.selectedWatchlistName);
  }

}
