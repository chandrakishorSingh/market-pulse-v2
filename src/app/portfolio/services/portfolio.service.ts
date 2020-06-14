import { Injectable } from '@angular/core';
import {PortfolioItem} from '../../models/models';
import {mapServerResponse, PortfolioSummary} from '../../utils/utils';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../auth/services/user.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  portfolioSummary: PortfolioSummary;
  portfolio: PortfolioItem[] = [];

  portfolioObserver = new Subject<{ portfolio: PortfolioItem[], portfolioSummary: PortfolioSummary }>();

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.initializePortfolio();
  }

  async initializePortfolio() {
    this.portfolio = (await this.getPortfolio()).portfolio;
  }

  async getPortfolio() {
    const user = await this.userService.getUser();
    const phoneNumber = user.phoneNumber.replace('+', '');
    const result = await this.http.get(environment.api.getPortfolio + `?phoneNumber=%2B${phoneNumber}`).toPromise() as any;
    this.portfolio = result.portfolio.map(item => mapServerResponse(item));
    this.portfolioSummary = mapServerResponse(result.portfolioSummary) as PortfolioSummary;
    this.portfolioObserver.next({ portfolio: [...this.portfolio], portfolioSummary: {...this.portfolioSummary} });
    return { portfolio: [...this.portfolio], portfolioSummary: {...this.portfolioSummary} };
  }

  async getPortfolioItem(symbol: string) {
    return (await this.getPortfolio()).portfolio.find(item => item.symbol === symbol);
  }
}
