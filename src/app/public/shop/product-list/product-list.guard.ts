import { TOGGLE_LOADER, LOAD_PRODUCTS } from './../store/shop.actions';
import { AppState } from './../../../store/app.reducers';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductCollections } from '../../../service/product/product-collections.model';

@Injectable()
export class ProductListGuard implements CanActivate {

  constructor(
      private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
      return this.store.select(state => state.shop.products)
          .take(1)
          .map((products: ProductCollections) => {
              if (products.isEmpty()) {
                  this.store.dispatch({
                      type: TOGGLE_LOADER,
                      payload: true
                  });
                  this.store.dispatch({
                      type: LOAD_PRODUCTS
                  });
              }
              return true;
          });
  }
}
