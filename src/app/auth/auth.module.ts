import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ConfirmSignupComponent} from './confirm-signup/confirm-signup.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AuthPage,
    SigninComponent,
    SignupComponent,
    ConfirmSignupComponent
  ]
})
export class AuthPageModule {}
