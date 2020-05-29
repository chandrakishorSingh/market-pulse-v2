import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {mapServerResponse} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) {}

  storeUserInDb(email: string, firstName: string, lastName: string, phoneNumber: string) {
    const user = { firstName, lastName, email, phoneNumber };
    this.httpClient.post(environment.api.user, user, ).subscribe((res) => {
      console.log(res);
    });
  }

  getUserData(phone: string) {
    const phoneNumber = phone.replace(/\+/, '%2B');
    return this.httpClient.get<any>(environment.api.user + `?phoneNumber=${phoneNumber}`).toPromise()
      .then((result) => {
        return mapServerResponse(result.user);
      });
  }

}
