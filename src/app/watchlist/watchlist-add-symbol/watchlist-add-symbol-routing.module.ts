import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchlistAddSymbolPage } from './watchlist-add-symbol.page';

const routes: Routes = [
  {
    path: '',
    component: WatchlistAddSymbolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistAddSymbolPageRoutingModule {}
