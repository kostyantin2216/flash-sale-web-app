import { DetailedProduct } from './../../../service/product.service';
import { TOGGLE_LOADER, LOAD_PRODUCT_DETAILS } from './../store/shop.actions';
import { AppState } from './../../../store/app.reducers';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductDetailsGuard implements CanActivate {

  constructor(
      private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    return this.store.select(state => state.shop.productDetails)
        .take(1)
        .map((product: DetailedProduct) => {
            const category = route.params['category'];
            const name = route.params['productName'];

            if (!product || product.name !== name || product.brand !== category) {
                this.store.dispatch({
                    type: TOGGLE_LOADER,
                    payload: true
                });
                this.store.dispatch({
                    type: LOAD_PRODUCT_DETAILS,
                    payload: {
                        category: category,
                        name: name
                    }
                });
            }

            return true;
        });
  }
}
