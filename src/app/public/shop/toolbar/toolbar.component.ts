import { ShoppingCartState } from './../../../service/cart/shopping-cart.state';
import { OrderedProduct } from './../../../service/product/ordered-product.model';
import { User } from '../../../service/user/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthState } from './../../auth/store/auth.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LOGOUT } from '../../auth/store/auth.actions';
import { AppState } from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import * as ShopActions from './../store/shop.actions';
import * as AuthActions from './../../auth/store/auth.actions';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  CartState = ShoppingCartState;

  auth$: Observable<AuthState>;
  cartState$: Observable<ShoppingCartState>;

  cartItems = 0;
  cartVisible = false;

  private productsSub: Subscription;
  private cartVisibilitySub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.auth$ = this.store.pipe(select('auth'));
    this.cartState$ = this.store.select(state => state.shop.cartState);
    this.productsSub = this.store.select(state => state.shop.cart.products)
                                 .subscribe((products: OrderedProduct[]) => this.cartItems = products.length);
    this.cartVisibilitySub = this.store.select(state => state.shop.showingCart)
                                       .subscribe(showingCart => this.cartVisible = showingCart);
  }

  ngOnDestroy() {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
    if (this.cartVisibilitySub) {
      this.cartVisibilitySub.unsubscribe();
    }
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  showCart() {
    this.store.dispatch(new ShopActions.ToggleCart(true));
  }

}
