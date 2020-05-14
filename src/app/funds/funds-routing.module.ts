import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundsPage } from './funds.page';

const routes: Routes = [
  {
    path: '',
    component: FundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundsPageRoutingModule {}
