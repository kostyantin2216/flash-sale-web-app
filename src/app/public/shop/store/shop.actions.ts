import { ProductCollections } from './../../../service/product.service';
import { Action } from "@ngrx/store";
import { SummarizedProduct } from "../../../service/product.service";

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCT_DETAILS = 'LOAD_PRODUCT_DETAILS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

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

export type ShopActions = LoadProducts | LoadProductDetails | SetProducts;
