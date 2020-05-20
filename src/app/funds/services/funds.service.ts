import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor() {}

  getFunds() {
    return 1000;
    // TODO: fetch the fund amount from db
  }

}
