import {Component, Input, OnInit} from '@angular/core';
import {PortfolioItem} from '../../models/models';
import {ModalController} from "@ionic/angular";
import {ModalService} from "../../shared-services/modal.service";
import {PortfolioItemDetailComponent} from "./portfolio-item-detail/portfolio-item-detail.component";

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss'],
})
export class PortfolioItemComponent implements OnInit {

  @Input() portfolioItem: PortfolioItem;

  constructor(private modalController: ModalController,
              private modalService: ModalService) {}

  ngOnInit() {}

  async onShowPortfolioItemDetail() {
    this.modalService.openModal();
    const portfolioDetailModal = await this.modalController.create({
      component: PortfolioItemDetailComponent,
      componentProps: { portfolioItem: this.portfolioItem }
    }).then(page => {
      page.style.marginTop = '30rem';
      return page;
    });
    await portfolioDetailModal.present();
  }

}
