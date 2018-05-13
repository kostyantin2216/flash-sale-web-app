import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { ProductCollections } from './../../../service/product/product-collections.model';
import { SummarizedProduct } from './../../../service/product/summarized-product.model';
import { ProductService } from './../../../service/product/product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import * as ShopActions from './shop.actions';

@Injectable()
export class ShopEffects {

    @Effect()
    loadProducts = this.actions$
        .ofType(ShopActions.LOAD_PRODUCTS)
        .switchMap((action: ShopActions.LoadProducts) =>  this.productService.fetchAllProducts())
        .mergeMap((products: SummarizedProduct[]) => {
            const collections = new ProductCollections(products);
            return [
                {
                    type: ShopActions.SET_PRODUCTS,
                    payload: collections
                },
                {
                    type: ShopActions.TOGGLE_LOADER,
                    payload: false
                }
            ];
        });

    @Effect()
    loadProductDetails = this.actions$
        .ofType(ShopActions.LOAD_PRODUCT_DETAILS)
        .switchMap((action: ShopActions.LoadProductDetails) => this.productService.fetchProductDetails(action.payload.category, action.payload.name))
        .mergeMap((product: DetailedProduct) => {
            return [
                {
                    type: ShopActions.SET_PRODUCT_DETAILS,
                    payload: product
                },
                {
                    type: ShopActions.TOGGLE_LOADER,
                    payload: false
                }
            ];
        });

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
