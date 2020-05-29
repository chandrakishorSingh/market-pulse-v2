import {Injectable} from '@angular/core';
import {
  AuthenticationDetails, CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  IAuthenticationDetailsData,
  ICognitoUserAttributeData,
  ICognitoUserData,
  ICognitoUserPoolData
} from 'amazon-cognito-identity-js';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  poolData: ICognitoUserPoolData;
  userPool: CognitoUserPool;
  cognitoUser: CognitoUser;
  isAuthenticated = false;
  onAuthStatusChanged = new Subject<boolean>();

  constructor(private userService: UserService) {
    this.poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId
    };
    this.userPool = new CognitoUserPool(this.poolData);
    this.broadcastAuthStatusOnAppOpen();
  }

  async broadcastAuthStatusOnAppOpen() {
    this.isAuthenticated = await this.userService.isAuthenticated();
    this.onAuthStatusChanged.next(this.isAuthenticated);
  }

  async signup(email: string, firstName: string, lastName: string, password: string, phoneNumber: string) {
    const dataPhoneNumber: ICognitoUserAttributeData = { Name: 'phone_number', Value: phoneNumber };
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    const attributeList = [attributePhoneNumber];
    this.createCognitoUser(phoneNumber);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(phoneNumber, password, attributeList, null, (err, result) => {
        // console.log('err is ', err);
        // console.log('result is ', result);
        err ? reject(err) : resolve(result);
      });
    });
  }

  createCognitoUser(phoneNumber: string) {
    const userData: ICognitoUserData = { Username: phoneNumber, Pool: this.userPool };
    this.cognitoUser = new CognitoUser(userData);
  }

  resendConfirmationCode() {
    return new Promise((resolve, reject) => {
      this.cognitoUser.resendConfirmationCode((err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  confirmRegistration(code: string) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmRegistration(code, true, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  async signin(phoneNumber: string, password: string) {
    const authenticationData: IAuthenticationDetailsData = {
      Username: phoneNumber,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: phoneNumber,
      Pool: this.userPool,
    };
    this.cognitoUser = new CognitoUser(userData);
    const that = this;
    console.log('cognito user', this.cognitoUser);
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          that.isAuthenticated = true;
          that.onAuthStatusChanged.next(that.isAuthenticated);
          that.userService.storePhoneNumber(phoneNumber).then(() => {
            resolve(result);
          });
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  }

  async logout() {
    console.log('cognito user of logout', this.cognitoUser);
    console.log('isAuthenticated in logout', this.isAuthenticated);
    // this.cognitoUser.signOut();
    await this.userService.clearUserData();

    this.isAuthenticated = false;
    this.onAuthStatusChanged.next(this.isAuthenticated);
  }

}
