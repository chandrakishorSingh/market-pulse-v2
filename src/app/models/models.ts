export interface IWatchlist {
  name: string;
  symbols: string[];
}

export class WatchItem {
  public change: number;
  public changePercentage: number;

  constructor(public symbol: string,
              public latestPrice: number,
              public previousPrice: number) {
    this.symbol = this.symbol.toUpperCase();
    this.change = Number((this.latestPrice - this.previousPrice).toString().substr(0, 5));
    this.changePercentage = Number(((Math.abs(this.change) / this.previousPrice) * 100).toPrecision(2).substr(0, 4));
  }
}
