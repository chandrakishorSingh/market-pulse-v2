import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalService} from '../../../shared-services/modal.service';
import {PortfolioItem} from '../../../models/models';

@Component({
  selector: 'app-portfolio-item-detail',
  templateUrl: './portfolio-item-detail.component.html',
  styleUrls: ['./portfolio-item-detail.component.scss'],
})
export class PortfolioItemDetailComponent implements OnInit {

  @Input() portfolioItem: PortfolioItem;

  constructor(private modalController: ModalController,
              private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.onModalClose.subscribe(() => {
      this.modalController.dismiss();
    });
  }

  abs(n) {
    return Math.abs(n);
  }

  getStyle(n) {
    return n > 0 ? { color: 'var(--ion-color-success)' } : { color: 'var(--ion-color-danger)' };
  }

}
