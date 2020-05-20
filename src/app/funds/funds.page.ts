import { Component, OnInit } from '@angular/core';
import {FundsService} from "./services/funds.service";

@Component({
  selector: 'app-funds',
  templateUrl: './funds.page.html',
  styleUrls: ['./funds.page.scss'],
})
export class FundsPage implements OnInit {

  funds: number;
  iconMap = {
    up: 'chevron-up-outline',
    down: 'chevron-down-outline'
  };
  isSummaryOpened = false;

  constructor(private fundsService: FundsService) {}

  ngOnInit() {
    this.funds = this.fundsService.getFunds();
  }

  onClick() {
    this.isSummaryOpened = !this.isSummaryOpened;
  }

}
