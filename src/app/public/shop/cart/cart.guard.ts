import { ShoppingCartState } from './../../../service/cart/shopping-cart.state';
import { AppState } from './../../../store/app.reducers';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ShopActions from './../store/shop.actions';

@Injectable()
export class CartGuard implements CanActivate {

  constructor(
      private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
      return this.store.select(state => state.shop.cart.token)
          .take(1)
          .map((token: string) => {
              if (token) {
                  this.store.dispatch(new ShopActions.SetCartState(ShoppingCartState.LOADING));
                  this.store.dispatch(new ShopActions.LoadCart(token));
              }
              return true;
          });
  }
}
