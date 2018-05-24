import { Observable } from 'rxjs/Observable';
import * as ShopActions from './../../store/shop.actions';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../../store/app.reducers';

@Component({
  selector: 'app-cart-expiry-popup',
  templateUrl: './cart-expiry-popup.component.html',
  styleUrls: ['./cart-expiry-popup.component.scss']
})
export class CartExpiryPopupComponent implements OnInit, OnDestroy {

  private static readonly SHOW_WHEN_BELOW_MS = 3597000;

  expiresIn = 0;
  showSelf = false;
  loading = false;

  private expirySub: Subscription;
  private timerSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.expirySub = this.store.select(state => state.shop.cart.expiresOn)
                                .subscribe(expiresOn => this.updateExpiry(expiresOn));
  }

  updateExpiry(expiresOn) {
    this.expiresIn = expiresOn - Date.now();
    this.loading = false;
    this.showSelf = false;

    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }

    if (this.expiresIn > 0) {
      let showIn = this.expiresIn - CartExpiryPopupComponent.SHOW_WHEN_BELOW_MS;
      if (showIn <= 0) {
        this.showSelf = true;
      } else {
        this.timerSub = Observable.timer(showIn)
                                  .subscribe(() => this.showSelf = true);
      }
    }
  }

  onExpired() {
    this.showSelf = false;
  }

  ngOnDestroy() {
    if (this.expirySub) {
      this.expirySub.unsubscribe();
    }
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  giveMeMoreTime() {
    this.loading = true;
    this.store.select(state => state.shop.cart.token)
              .take(1)
              .delay(1000)
              .subscribe(token => {
                this.store.dispatch(new ShopActions.LoadCart(token));
              });
  }

  close() {
    this.showSelf = false;
  }

}
