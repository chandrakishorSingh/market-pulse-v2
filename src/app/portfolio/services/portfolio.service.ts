import { Injectable } from '@angular/core';
import {PortfolioItem} from '../../models/models';
import {PortfolioSummary} from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  portfolioSummary: PortfolioSummary = {
    currentValue: 50000,
    totalInvestment: 55000,
    dayPl: 2000,
    pl: -5000,
    plPercentage: -10
  };

  portfolio: PortfolioItem[] = [
    {
      symbol: 'ADANIPOWER',
      quantity: 78,
      latestPrice: 30.95,
      avgPrice: 30.39,
      currentValue: 2410.20,
      dayProfitLoss: 7.80,
      profitLoss: 39.78,
      profitLossPercentage: 1.68,
      totalInvestment: 2370.42
    },
    {
      symbol: 'HDFCBANK',
      quantity: 4,
      latestPrice: 850,
      avgPrice: 893.15,
      currentValue: 3398,
      dayProfitLoss: 49.4,
      profitLoss: -174.20,
      profitLossPercentage: -4.99,
      totalInvestment: 3572.6
    },
    {
      symbol: 'HINDUNILVR',
      quantity: 3,
      latestPrice: 2008.3,
      avgPrice: 2080,
      currentValue: 6029.1,
      dayProfitLoss: 13.65,
      profitLoss: -210.6,
      profitLossPercentage: -3.34,
      totalInvestment: 6240
    },
    {
      symbol: 'ICICIBANK',
      quantity: 16,
      latestPrice: 306.45,
      avgPrice: 330.13,
      currentValue: 4918.23,
      dayProfitLoss: 136.23,
      profitLoss: -374.23,
      profitLossPercentage: -7.06,
      totalInvestment: 5282.08
    }
  ];

  constructor() {
    this.portfolio = this.getPortfolio().portfolio;
  }

  getPortfolio() {
    return { portfolio: [...this.portfolio], portfolioSummary: {...this.portfolioSummary} }
    // TODO: fetch the portfolio from database
  }
}
