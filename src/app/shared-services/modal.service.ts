import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // subject for informing the app-level modal status(close=false/open=true)
  modalSubject = new Subject<boolean>();
  onModalClose = new Subject<void>();
  onModalOpen = new Subject<void>();

  openModal() {
    this.modalSubject.next(true);
    this.onModalOpen.next();
  }

  closeModal() {
    this.modalSubject.next(false);
    this.onModalClose.next();
  }

}
