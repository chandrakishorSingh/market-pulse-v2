import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionPage } from './transaction.page';
import {SellComponent} from "./sell/sell.component";
import {BuyComponent} from "./buy/buy.component";

const routes: Routes = [
  {
    path: '',
    component: TransactionPage
  },
  {
    path: 'sell/:id',
    component: SellComponent
  },
  {
    path: 'buy/:id',
    component: BuyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionPageRoutingModule {}
