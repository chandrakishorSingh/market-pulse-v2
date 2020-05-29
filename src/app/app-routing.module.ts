import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeGuard} from "./auth/guard/home.guard";
import {AuthGuard} from "./auth/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [HomeGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    canLoad: [HomeGuard]
  },
  {
    path: 'funds',
    loadChildren: () => import('./funds/funds.module').then( m => m.FundsPageModule),
    canLoad: [HomeGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
