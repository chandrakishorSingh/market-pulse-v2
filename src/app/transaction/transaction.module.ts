import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import {SellComponent} from './sell/sell.component';
import {BuyComponent} from './buy/buy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransactionPageRoutingModule
  ],
  declarations: [
    TransactionPage,
    SellComponent,
    BuyComponent
  ]
})
export class TransactionPageModule {}
