import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchlistPage } from './watchlist.page';

const routes: Routes = [
  {
    path: '',
    component: WatchlistPage
  },
  {
    path: 'add-symbol',
    loadChildren: () => import('./watchlist-add-symbol/watchlist-add-symbol.module').then( m => m.WatchlistAddSymbolPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistPageRoutingModule {}
