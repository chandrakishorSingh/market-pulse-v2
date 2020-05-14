import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // subject for informing the app-level modal status(close=false/open=true)
  modalSubject = new Subject<boolean>();

  openModal() {
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }

}
