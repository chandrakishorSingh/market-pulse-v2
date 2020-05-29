import {SignalType} from "../utils/utils";

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

export class Order {
  constructor(public symbol: string,
              public signalType: SignalType,
              public quantity: number,
              public price: number,
              public date: string) {}
}

export class PortfolioItem {
  constructor(public symbol: string,
              public quantity: number,
              public latestPrice: number,
              public profitLoss: number,
              public profitLossPercentage: number,
              public dayProfitLoss: number,
              public avgPrice: number,
              public totalInvestment: number,
              public currentValue: number) {}

}

export class User {
  constructor(public firstName: string,
              public lastName: string,
              public email: string,
              public phoneNumber: string,
              public createdAt: string,
              public deviceToken: string) {}
}

export class NotificationItem {

  constructor(public symbol: string,
              public signalType: string,
              public createdAt: string,
              public ltp: number) {}

}
