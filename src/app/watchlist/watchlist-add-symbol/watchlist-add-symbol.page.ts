import { Component, OnInit } from '@angular/core';
import {WatchlistService} from '../services/watchlist.service';
import {IonInput} from '@ionic/angular';

interface Stock {
  symbol: string;
  selected: boolean;
}

@Component({
  selector: 'app-watchlist-add-symbol',
  templateUrl: './watchlist-add-symbol.page.html',
  styleUrls: ['./watchlist-add-symbol.page.scss'],
})
export class WatchlistAddSymbolPage implements OnInit {

  allStocks: Stock[] = [];
  listedStocks: Stock[] = [];
  watchlistStocks: Stock[] = [];
  isEditing = false;

  constructor(private watchlistService: WatchlistService) {}

  async ngOnInit() {
    // determine current watchlist
    const selectedWatchlistName = this.watchlistService.selectedWatchlistName;
    const selectedWatchlist = this.watchlistService.getWatchListByName(selectedWatchlistName);
    this.watchlistStocks = selectedWatchlist.symbols.map(symbol => {
      return { symbol, selected: true };
    });
    // prepare an object which will describes the state of all selected and non-selected symbols
    const allSymbols = await this.watchlistService.getSymbols();
    const selectedSymbols = selectedWatchlist.symbols;
    const notSelectedSymbols = allSymbols.filter(symbol => !selectedSymbols.includes(symbol));
    this.allStocks = this.watchlistStocks.concat(notSelectedSymbols.map(symbol => {
        return { symbol, selected: false };
      })
    );
    console.log(this.allStocks);
  }

  onInputChange(event: CustomEvent) {
    const input = event.detail.value.toUpperCase() as string;
    this.isEditing = input.length > 0;
    this.listedStocks = this.allStocks.filter(item => item.symbol.startsWith(input));
  }

  async onCancel(inputRef: IonInput) {
    inputRef.value = '';
    await inputRef.setFocus();
    this.isEditing = false;
  }

  onStockRemove(stock: Stock) {
    stock.selected = false;
    const watchlistName = this.watchlistService.selectedWatchlistName;
    this.watchlistService.removeSymbolFromWatchlist(watchlistName, stock.symbol);
  }

  onStockAdd(stock: { symbol: string, selected: boolean }) {
    stock.selected = true;
    const watchlistName = this.watchlistService.selectedWatchlistName;
    this.watchlistService.addSymbolToWatchList(watchlistName, stock.symbol);
  }

}
