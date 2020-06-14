import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validator} from '../../custom-validators/validator';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {DatabaseService} from '../../shared-services/database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private dbService: DatabaseService) {
    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl(null, validator),
    });
  }

  async onSubmit() {
    const { email, firstName, lastName, password, phoneNumber } = this.form.value;
    const phone = '+91' + phoneNumber;

    this.dbService.storeUserInDb(email, firstName, lastName, phone);

    console.log(phone);

    const loadingEle = await this.loadingCtrl.create({ message: 'Loading...' });
    await loadingEle.present();

    this.authService.signup(email, firstName, lastName, password, phone)
      .then(async data => {
        await loadingEle.dismiss();
        await this.router.navigate(['/', 'auth', 'confirm-signup', 'new']);
      })
      .catch(async err => {
        await loadingEle.dismiss();
        if (err.code === 'UsernameExistsException') {
          await this.router.navigate(['/', 'auth', 'confirm-signup', 'old']);
          await this.authService.resendConfirmationCode();
        } else {
          this.alertCtrl.create({ header: 'Error', message: err.message || 'Unknown Error' }).then(alertEle => alertEle.present());
        }
      });
  }

}
