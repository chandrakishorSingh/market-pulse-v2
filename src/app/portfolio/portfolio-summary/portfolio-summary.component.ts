import { Component, OnInit } from '@angular/core';
import {PortfolioSummary} from '../../utils/utils';
import {PortfolioService} from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss'],
})
export class PortfolioSummaryComponent implements OnInit {

  portfolioSummary: PortfolioSummary;
  iconMap = {
    up: 'chevron-up-outline',
    down: 'chevron-down-outline'
  };
  isSummaryOpened = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioSummary = this.portfolioService.portfolioSummary;
    this.portfolioService.portfolioObserver.subscribe(res => {
      this.portfolioSummary = res.portfolioSummary;
    });
  }

  abs(n) {
    return Math.abs(n);
  }

  onSummaryClick() {
    this.isSummaryOpened = !this.isSummaryOpened;
  }

}
