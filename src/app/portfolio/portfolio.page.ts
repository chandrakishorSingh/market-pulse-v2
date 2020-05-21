import { Component, OnInit } from '@angular/core';
import {PortfolioItem} from "../models/models";
import {PortfolioService} from "./services/portfolio.service";
import {IonInput} from "@ionic/angular";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {

  allPortfolioItems: PortfolioItem[] = [];
  listedPortfolioItems: PortfolioItem[] = [];
  isSearching = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.allPortfolioItems = this.portfolioService.getPortfolio().portfolio;
    this.listedPortfolioItems = this.allPortfolioItems;
  }

  onSearch() {
    this.isSearching = true;
  }

  async onCancel(inputRef: IonInput) {
    inputRef.value = '';
    await inputRef.setFocus();
    this.isSearching = false;
    this.listedPortfolioItems = this.allPortfolioItems;
  }

  onInputChange(event: CustomEvent) {
    const symbol = event.detail.value.toUpperCase();
    this.listedPortfolioItems = this.allPortfolioItems.filter(order => order.symbol.startsWith(symbol));
  }

}
