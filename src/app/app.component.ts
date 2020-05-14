import { Component, OnInit } from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {WatchlistService} from './watchlist/services/watchlist.service';
import {ModalService} from './shared-services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  isModalOpen = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalService: ModalService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.modalService.modalSubject.subscribe(isModalOpen => {
      this.isModalOpen = isModalOpen;
    });
  }

  async onBackDropClick() {
    this.modalService.closeModal();
  }
}
