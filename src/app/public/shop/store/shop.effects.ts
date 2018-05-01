import { ProductService, SummarizedProduct, productPriceComparator, ProductCollections } from './../../../service/product.service';
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
            const collections = new ProductCollections();

            products.sort(productPriceComparator);

            products.forEach(product => {
                if (product.price <= 100) {
                    collections.under100.content.push(product);
                } else if (product.price <= 400) {
                    collections.under400.content.push(product);
                } else if (product.price <= 1000) {
                    collections.under1000.content.push(product);
                } else {
                    collections.over1000.content.push(product);
                }
            });

            return {
                type: ShopActions.SET_PRODUCTS,
                payload: collections
            };
        });

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
