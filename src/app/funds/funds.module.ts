import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundsPageRoutingModule } from './funds-routing.module';

import { FundsPage } from './funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundsPageRoutingModule
  ],
  declarations: [FundsPage]
})
export class FundsPageModule {}
