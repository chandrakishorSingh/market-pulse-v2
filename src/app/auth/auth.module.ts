import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [
    AuthPage,
    SigninComponent,
    SignupComponent
  ]
})
export class AuthPageModule {}
