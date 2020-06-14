import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {ConfirmSignupComponent} from './confirm-signup/confirm-signup.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'confirm-signup/:status',
    component: ConfirmSignupComponent
  },
  {
    path: '',
    redirectTo: '/auth/signup',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
