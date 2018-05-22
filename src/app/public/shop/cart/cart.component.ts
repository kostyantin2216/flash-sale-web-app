import { Observable } from 'rxjs/Observable';
import { AppState } from './../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderedProduct } from '../../../service/product/ordered-product.model';
import * as ShopActions from './../store/shop.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products$: Observable<OrderedProduct[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => state.shop.cart.products);
  }

  closeCart() {
    this.store.dispatch(new ShopActions.ToggleCart(false));
  }

}
