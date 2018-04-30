import { ProductService, SummarizedProduct } from './../../../service/product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import * as ShopActions from './shop.actions';

@Injectable()
export class ShopEffects {

    @Effect()
    loadProducts = this.actions$
        .ofType(ShopActions.LOAD_PRODUCTS)
        .switchMap((action: ShopActions.LoadProducts) =>  this.productService.fetchAllProducts())
        .map((products: SummarizedProduct[]) => {
            return {
                type: ShopActions.SET_PRODUCTS,
                payload: products
            };
        });

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
