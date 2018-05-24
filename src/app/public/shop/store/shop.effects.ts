import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { ShoppingCartService } from './../../../service/cart/shopping-cart.service';
import { AppState } from './../../../store/app.reducers';
import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { ProductCollections } from './../../../service/product/product-collections.model';
import { SummarizedProduct } from './../../../service/product/summarized-product.model';
import { ProductService } from './../../../service/product/product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import * as ShopActions from './shop.actions';
import { Store, Action } from '@ngrx/store';
import { ShoppingCart } from '../../../service/cart/shopping-cart.model';
import { ShoppingCartState } from '../../../service/cart/shopping-cart.state';


@Injectable()
export class ShopEffects {

    @Effect()
    loadProducts = this.actions$
        .ofType(ShopActions.LOAD_PRODUCTS)
        .switchMap((action: ShopActions.LoadProducts) =>  this.productService.fetchAllProducts())
        .mergeMap((products: SummarizedProduct[]) => {
            const collections = new ProductCollections(products);
            return [
                new ShopActions.SetProducts(collections),
                new ShopActions.ToggleLoader(false)
            ];
        });

    @Effect()
    loadProductDetails = this.actions$
        .ofType(ShopActions.LOAD_PRODUCT_DETAILS)
        .switchMap((action: ShopActions.LoadProductDetails) => this.productService.fetchProductDetails(action.payload.category, action.payload.name))
        .mergeMap((product: DetailedProduct) => {
            return [
                new ShopActions.SetProductDetails(product),
                new ShopActions.ToggleLoader(false)
            ];
        });

    @Effect()
    loadCart = this.actions$
        .ofType(ShopActions.LOAD_CART)
        .map((action: ShopActions.LoadCart) => action.payload)
        .switchMap((token: string) => this.cartService.fetchProducts(token))
        .mergeMap((cart: ShoppingCart) => {
            let result: Action[] = [
                new ShopActions.SetCart(cart),
                new ShopActions.SetCartState(ShoppingCartState.IDLE)
            ];

            if (cart !== undefined && cart.products !== undefined && cart.products.length > 0) {
                result.push(new ShopActions.ToggleCart(true));
            } else {
                cart.token = null;
            }

            return result;
        })
        .catch(err => {
            return Observable.of<Action>(
                new ShopActions.SetCart({token: null, products: [], expiresOn: 0}),
                new ShopActions.SetCartState(ShoppingCartState.IDLE)
            );
        });

    @Effect()
    addToCart = this.actions$
        .ofType(ShopActions.ADD_TO_CART)
        .withLatestFrom(this.store$.select(state => state.shop.cart.token))
        .switchMap(([action, token]: [ShopActions.AddToCart, string]) => {
            return this.cartService.addProduct(action.payload, token);
        })
        .mergeMap((cart: ShoppingCart) => {
            return [
                new ShopActions.SetCart(cart),
                new ShopActions.SetCartState(ShoppingCartState.IDLE),
                new ShopActions.ToggleCart(true)
            ];
        });

    @Effect()
    removeFromCart = this.actions$
        .ofType(ShopActions.REMOVE_FROM_CART)
        .withLatestFrom(this.store$.select(state => state.shop.cart.token))
        .switchMap(([action, token]: [ShopActions.AddToCart, string]) => {
            return this.cartService.removeProduct(action.payload, token);
        })
        .mergeMap((cart: ShoppingCart) => {
            return [
                new ShopActions.SetCart(cart),
                new ShopActions.SetCartState(ShoppingCartState.IDLE),
                new ShopActions.ToggleCart(true)
            ];
        });

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private productService: ProductService,
        private cartService: ShoppingCartService
    ) { }
}
