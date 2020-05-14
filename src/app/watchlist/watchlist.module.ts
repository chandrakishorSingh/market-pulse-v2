import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistPageRoutingModule } from './watchlist-routing.module';

import { WatchlistPage } from './watchlist.page';

import {WatchItemComponent} from './watch-item/watch-item.component';
import {WatchlistSelectComponent} from './watchlist-select/watchlist-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistPageRoutingModule,
  ],
  declarations: [
    WatchItemComponent,
    WatchlistPage,
    WatchlistSelectComponent
  ],
  entryComponents: [
    WatchlistSelectComponent
  ]
})
export class WatchlistPageModule {}
