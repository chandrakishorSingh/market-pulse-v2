import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(private httpClient: HttpClient,
              private userService: UserService) {}

  async getFunds() {
    const user = await this.userService.getUser();
    const phoneNumber = user.phoneNumber.replace('+', '');
    return ((await this.httpClient.get(environment.api.getFunds + `?phoneNumber=%2B${phoneNumber}`).toPromise()) as any).funds as number;
  }

}
