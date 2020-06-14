import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../../models/models';
import {Subject} from 'rxjs';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<User>();

  constructor(private storage: Storage) {}

  async storeUser(user: User) {
    await this.storage.set('user', user);
    this.userSubject.next(user);
  }

  async getUser() {
    await this.storage.ready();
    return await this.storage.get('user') as User;
  }

  async storePhoneNumber(phoneNumber: string) {
    await this.storage.ready();
    await this.storage.set('phoneNumber', phoneNumber);
    await this.storage.set('isAuthenticated', true);
  }

  async isAuthenticated() {
    await this.storage.ready();
    return (await this.storage.length()) > 0;
  }

  async clearUserData() {
    await this.storage.clear();
    this.userSubject.next(null);
  }

  async saveUserToken(user: CognitoUser) {
    const refreshToken = user.getSignInUserSession().getRefreshToken().getToken();
    const accessToken = user.getSignInUserSession().getAccessToken().getJwtToken();
    const idToken = user.getSignInUserSession().getIdToken().getJwtToken();

    await this.storage.set('refreshToken', refreshToken);
    await this.storage.set('accessToken', accessToken);
    await this.storage.set('idToken', idToken);
  }

  async getStoredValue(key: string) {
    return await this.storage.get(key);
  }

}
