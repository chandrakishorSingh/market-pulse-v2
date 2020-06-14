import { Component, OnInit } from '@angular/core';
import {FundsService} from './services/funds.service';
import {LoadingController} from '@ionic/angular';

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

  constructor(private fundsService: FundsService,
              private loadingCtrl: LoadingController) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    const loadingEle = await this.loadingCtrl.create({ message: 'Loading...' });
    await loadingEle.present();

    this.funds = await this.fundsService.getFunds();

    await loadingEle.dismiss();
  }

  async onRefresh(event) {
    await this.ionViewWillEnter();
    event.target.complete();
  }

  onClick() {
    this.isSummaryOpened = !this.isSummaryOpened;
  }

}
