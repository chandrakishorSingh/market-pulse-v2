import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioPageRoutingModule } from './portfolio-routing.module';

import { PortfolioPage } from './portfolio.page';
import {PortfolioItemComponent} from './portfolio-item/portfolio-item.component';
import {PortfolioItemDetailComponent} from './portfolio-item/portfolio-item-detail/portfolio-item-detail.component';
import {PortfolioService} from './services/portfolio.service';
import {PortfolioSummaryComponent} from './portfolio-summary/portfolio-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioPageRoutingModule
  ],
  declarations: [
    PortfolioPage,
    PortfolioItemComponent,
    PortfolioItemDetailComponent,
    PortfolioSummaryComponent
  ],
  providers: [
    PortfolioService
  ],
  entryComponents: [
    PortfolioItemDetailComponent
  ]
})
export class PortfolioPageModule {}
