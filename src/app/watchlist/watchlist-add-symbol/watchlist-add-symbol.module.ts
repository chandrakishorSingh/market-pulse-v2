import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistAddSymbolPageRoutingModule } from './watchlist-add-symbol-routing.module';

import { WatchlistAddSymbolPage } from './watchlist-add-symbol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistAddSymbolPageRoutingModule
  ],
  declarations: [WatchlistAddSymbolPage]
})
export class WatchlistAddSymbolPageModule {}
