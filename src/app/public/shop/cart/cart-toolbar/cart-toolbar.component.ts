import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../../store/app.reducers';
import { OrderedProduct } from '../../../../service/product/ordered-product.model';
import { Subscription } from 'rxjs/Subscription';
import * as ShopActions from './../../store/shop.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-cart-toolbar',
  templateUrl: './cart-toolbar.component.html',
  styleUrls: ['./cart-toolbar.component.scss']
})
export class CartToolbarComponent implements OnInit, OnDestroy {

  totalPrice = 0;
  expiresIn = 0;

  expiresInSub: Subscription;
  productsSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.productsSub = this.store.select(state => state.shop.cart.products)
                                 .subscribe((products: OrderedProduct[]) => {
                                   this.totalPrice = 0;
                                   products.forEach(product => {
                                     this.totalPrice += product.price;
                                   });
                                 });

    this.expiresInSub = this.store.select(state => state.shop.cart.expiresOn)
                                  .subscribe(expiresOn => this.expiresIn = expiresOn - Date.now());
  }

  onExpired() {
    this.store.select(state => state.shop.cart.token)
              .take(1)
              .delay(1000)
              .subscribe(token => {
                this.store.dispatch(new ShopActions.LoadCart(token));
              });
  }

  ngOnDestroy() {
    if (this.expiresInSub) {
      this.expiresInSub.unsubscribe();
    }
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }

}
