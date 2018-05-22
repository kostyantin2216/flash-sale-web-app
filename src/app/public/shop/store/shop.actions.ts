import { OrderableProduct } from './../../../service/product/orderable-product.model';
import { ShoppingCart } from './../../../service/cart/shopping-cart.model';
import { ProductCollections } from './../../../service/product/product-collections.model';
import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { Action } from "@ngrx/store";
import { SummarizedProduct } from '../../../service/product/summarized-product.model';
import { ShoppingCartState } from '../../../service/cart/shopping-cart.state';

export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const TOGGLE_CART = 'TOGGLE_CART';
export const SET_CART_STATE = 'SET_CART_STATE';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCT_DETAILS = 'LOAD_PRODUCT_DETAILS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT_DETAILS = 'SET_PRODUCT_DETAILS';

export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';


export class ToggleLoader implements Action {
    readonly type = TOGGLE_LOADER;

    constructor(
        public payload?: boolean
    ) { }
}

export class ToggleCart implements Action {
    readonly type = TOGGLE_CART;

    constructor(
        public payload?: boolean
    ) { }
}

export class SetCartState implements Action {
    readonly type = SET_CART_STATE;

    constructor(
        public payload: ShoppingCartState
    ) { }
}


export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
}

export class LoadProductDetails implements Action {
    readonly type = LOAD_PRODUCT_DETAILS;

    constructor(
        public payload: {category: string, name: string}
    ) { }
}

export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;

    constructor(
        public payload: ProductCollections
    ) { }
}

export class SetProductDetails implements Action {
    readonly type = SET_PRODUCT_DETAILS;

    constructor(
        public payload: DetailedProduct
    ) { }
}


export class SetCart implements Action {
    readonly type = SET_CART;

    constructor(
        public payload: ShoppingCart
    ) {}
}

export class AddToCart implements Action {
    readonly type = ADD_TO_CART;

    constructor(
        public payload: OrderableProduct
    ) { }
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;

    constructor(
        public payload: OrderableProduct
    ) { }
}


export type ShopActions = ToggleLoader | ToggleCart | SetCartState
| LoadProducts | LoadProductDetails | SetProducts | SetProductDetails
| SetCart | AddToCart | RemoveFromCart;
