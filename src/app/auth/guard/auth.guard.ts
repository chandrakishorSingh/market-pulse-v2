import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private userService: UserService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.userService.isAuthenticated().then(isAuth => {
      if (isAuth) {
        this.router.navigate(['/', 'home', 'tabs', 'watchlist']);
      }
    });
    return this.userService.isAuthenticated().then(isAuth => !isAuth);
  }
}
