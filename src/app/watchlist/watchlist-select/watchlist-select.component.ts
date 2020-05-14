import {Component, OnDestroy, OnInit} from '@angular/core';
import {WatchlistService} from '../services/watchlist.service';
import {IWatchlist} from '../../models/models';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalService} from '../../shared-services/modal.service';

@Component({
  selector: 'app-watchlist-select',
  templateUrl: './watchlist-select.component.html',
  styleUrls: ['./watchlist-select.component.scss'],
})
export class WatchlistSelectComponent implements OnInit {

  watchlists: IWatchlist[] = [];
  selectedWatchListName: string;

  constructor(private watchlistService: WatchlistService,
              private modalService: ModalService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.watchlists = this.watchlistService.getWatchLists();
    this.selectedWatchListName = this.watchlistService.selectedWatchlistName;
    this.modalService.modalSubject.subscribe(isModalOpen => {
      if (!isModalOpen) {
        this.modalCtrl.dismiss();
      }
    });
  }

  onWatchlistSelect(name: string) {
    this.watchlistService.selectWatchlist(name);
    this.modalService.closeModal();
  }

  async onCreateWatchlist() {
    // close the watchlist select modal and open create watchlist alert
    this.modalService.closeModal();
    const alert = await this.alertCtrl.create({
      header: 'Create new watchlist',
      inputs: [
        {
          type: 'text',
          placeholder: 'Enter a name here',
          name: 'watchlist-name',
          max: '20'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          role: 'submit',
          handler: (data) => {
            this.watchlistService.createNewWatchList(data['watchlist-name']);
          }
        }
      ]
    });
    await alert.present();
  }

  async onWatchlistDelete(watchlistName: string) {
    // close the watchlist select modal and open delete watchlist alert
    this.modalService.closeModal();
    const alert = await this.alertCtrl.create({
      header: `Delete ${watchlistName} ?`,
      message: `Are you sure, you want to delete watchlist ${watchlistName} ?`,
      buttons: [
        {
          text: 'Yes',
          role: 'submit',
          handler: () => {
            this.watchlistService.deleteWatchlist(watchlistName);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async onWatchlistEdit(watchlistName: string) {
    // close the watchlist select modal and open delete watchlist alert
    this.modalService.closeModal();
    const alert = await this.alertCtrl.create({
      header: `Rename watchlist`,
      inputs: [
        {
          type: 'text',
          name: 'watchlist-name',
          value: watchlistName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          role: 'submit',
          handler: (data) => {
            this.watchlistService.renameWatchlist(watchlistName, data['watchlist-name']);
          }
        },
      ]
    });
    await alert.present();
  }

}
