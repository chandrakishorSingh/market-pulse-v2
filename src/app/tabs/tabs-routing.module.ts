import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/tabs/watchlist',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'portfolio',
        loadChildren: () => import('./../portfolio/portfolio.module').then( m => m.PortfolioPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./../orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./../transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'watchlist',
        loadChildren: () => import('./../watchlist/watchlist.module').then( m => m.WatchlistPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
