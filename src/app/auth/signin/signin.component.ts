import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validator, phoneNumberValidator} from '../../custom-validators/validator';
import {AuthService} from '../services/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DatabaseService} from '../../shared-services/database.service';
import {UserService} from '../services/user.service';
import {User} from '../../models/models';
import {NotificationService} from '../../shared-services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private router: Router,
              private dbService: DatabaseService,
              private userService: UserService,
              private notificationService: NotificationService) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.form = new FormGroup({
      phoneNumber: new FormControl(null, phoneNumberValidator),
      password: new FormControl(null, validator),
    });
  }

  async onSubmit() {
    const { password, phoneNumber } = this.form.value;
    const phone = '+91' + phoneNumber;

    const loadingEle = await this.loadingCtrl.create({ message: 'Logging in...' });
    await loadingEle.present();

    this.authService.signin(phone, password)
      .then(async () => {
        const user = await this.dbService.getUserData(phone) as User;
        await this.userService.storeUser(user);
        this.notificationService.registerPushNotification();

        await loadingEle.dismiss();

        await this.router.navigate(['/', 'home', 'tabs', 'watchlist']);
        const alertEle = await this.alertCtrl.create({
          header: 'Sign In Successful!' ,
          message: 'Welcome to Market-Pulse'
        });
        await alertEle.present();
      })
      .catch(async err => {
        await loadingEle.dismiss();
        const alertEle = await this.alertCtrl.create({
          header: 'Error' ,
          message: err.message || 'Unknown Error'
        });
        await alertEle.present();
      });
  }

}
