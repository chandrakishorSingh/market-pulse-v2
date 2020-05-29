import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {otpValidator} from '../../custom-validators/validator';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss'],
})
export class ConfirmSignupComponent implements OnInit {

  confirmationStatus: string;
  form: FormGroup;
  timer: number;

  constructor(private acRoute: ActivatedRoute,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private router: Router) {}

  ngOnInit() {
    this.confirmationStatus = this.acRoute.snapshot.paramMap.get('status');
    this.form = new FormGroup({
      otp: new FormControl(null, otpValidator)
    });
    this.setTimer(90);
  }

  onSubmit() {
    this.authService.confirmRegistration('' + this.form.value.otp)
      .then(async result => {
        console.log('after confirmRegistration result', result);
        if (result === 'SUCCESS') {
          await this.router.navigate(['/', 'auth', 'signin']);
          await this.alertCtrl.create({
            header: 'Sign Up Successful!' ,
            message: 'Log in to use the app'
          }).then(alert => alert.present());
        }
      })
      .catch(async err => {
        console.log('after confirmRegistration err', err);
        if (err.code === 'CodeMismatchException') {
          await this.alertCtrl.create({ header: 'Invalid OTP' , message: 'Entered OTP is wrong!' }).then(alert => alert.present());
        } else if (err.code === 'NotAuthorizedException') {
          await this.alertCtrl.create({
            header: 'Account already exists!' ,
            message: 'Account with the provided phone number already exists. Create new account or sign in to an existing one.'
          }).then(alert => alert.present());
          this.router.navigate(['/', 'auth']);
        }
      });
  }

  setTimer(seconds: number) {
    this.timer = seconds;
    for (let i = 0; i < seconds; i++) {
      setTimeout(() => {
        this.timer--;
      }, (i + 1) * 1000);
    }
  }

  onResendOtp() {
    this.authService.resendConfirmationCode();
    this.setTimer(90);
  }

}
