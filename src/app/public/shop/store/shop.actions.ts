import { ProductCollections } from './../../../service/product/product-collections.model';
import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { Action } from "@ngrx/store";

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCT_DETAILS = 'LOAD_PRODUCT_DETAILS';
export const SET_PRODUCT_DETAILS = 'SET_PRODUCT_DETAILS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
}

export class LoadProductDetails implements Action {
    readonly type = LOAD_PRODUCT_DETAILS;

    constructor(
        public payload: {category: string, name: string}
    ) { }
}

export class SetProductDetails implements Action {
    readonly type = SET_PRODUCT_DETAILS;

    constructor(
        public payload: DetailedProduct
    ) { }
}

export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;

    constructor(
        public payload: ProductCollections
    ) { }
}

export class ToggleLoader implements Action {
    readonly type = TOGGLE_LOADER;

    constructor(
        public payload: boolean
    ) { }
}

export type ShopActions = LoadProducts | LoadProductDetails | SetProductDetails | SetProducts | ToggleLoader;
