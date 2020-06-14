import { Component, OnInit } from '@angular/core';
import {NotificationItem} from '../../models/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../shared-services/notification.service';
import {UserService} from '../../auth/services/user.service';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';
import {integerValidator} from '../../custom-validators/validator';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit {

  notificationItem: NotificationItem;
  form: FormGroup;

  constructor(private acRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private userService: UserService,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router) {}

  ngOnInit() {
    const notificationItemIndex = +this.acRoute.snapshot.paramMap.get('id');
    this.notificationItem = this.notificationService.getNotificationItem(notificationItemIndex);
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      quantity: new FormControl(1, [Validators.required, integerValidator]),
    });
  }

  async onSubmit() {
    // show spinner while order is been processed
    const loadingEle = await this.loadingCtrl.create({ message: 'Placing your order...' });
    await loadingEle.present();

    // prepare the order object
    const user = await this.userService.getUser();
    const signalType = this.notificationItem.signalType;
    const symbol = this.notificationItem.symbol;
    const quantity = this.form.get('quantity').value as number;
    const price = this.notificationItem.ltp;

    const orderData = { phoneNumber: user.phoneNumber, signalType, symbol, quantity, price };
    this.http.post(environment.api.placeOrder, orderData).toPromise().then(async (result: any) => {
      await loadingEle.dismiss();
      await this.alertCtrl.create({
        header: result.title,
        message: result.message
      }).then(a => a.present());
      await this.router.navigate(['/', 'notifications']);
    }).catch(async err => {
      await loadingEle.dismiss();
      await this.alertCtrl.create({ header: 'Error in placing order', message: err.message || 'Unknown Error' })
        .then(a => a.present());
      await this.router.navigate(['/', 'notifications']);
    });
  }

  isDisabled() {
    const isUnderLimit = this.form.get('quantity').value * this.notificationItem.ltp > 50000;
    return this.form.invalid || isUnderLimit;
  }

}
