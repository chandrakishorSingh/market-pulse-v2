import { Component, OnInit } from '@angular/core';
import {
  AlertController, IonMenu,
  IonMenuToggle,
  LoadingController,
  MenuController,
  ModalController,
  Platform
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {WatchlistService} from './watchlist/services/watchlist.service';
import {ModalService} from './shared-services/modal.service';
import {AuthService} from "./auth/services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "./shared-services/notification.service";
import {UserService} from "./auth/services/user.service";
import {User} from "./models/models";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  isModalOpen = false;
  isAuthenticated = false;
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalService: ModalService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private userService: UserService
  ) {
    this.initializeApp();
    this.userService.getUser().then(user => {
      this.user = user;
    });
    this.userService.userSubject.subscribe((user) => {
      this.user = user;
    });
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
    this.authService.onAuthStatusChanged.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }

  async onBackDropClick() {
    this.modalService.closeModal();
  }

  async onLogout() {
    // wait for some time so that the menu can close itself before we try to move to another page
    await this.wait(200);
    const loadingEle = await this.loadingCtrl.create({ message: 'Logging out...' });
    await loadingEle.present();
    this.authService.logout()
      .then(async () => {
        await loadingEle.dismiss();
        await this.router.navigate(['/', 'auth']);
      })
      .catch(async err => {
        await loadingEle.dismiss();
        this.alertCtrl.create({ header: 'Error', message: err.message || 'Unknown Error' })
          .then(alertEle => alertEle.present());
      });
  }

  async onMenuItemClick(menuCtrl: IonMenu, path: string) {
    if (await menuCtrl.isOpen()) {
      this.router.navigateByUrl(path);
    }
  }

  async wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
