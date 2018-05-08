import { SummarizedProduct, ProductCollections } from './../../../service/product.service';
import * as ShopActions from "./shop.actions";

export interface ShopState {
    products: ProductCollections;
    productDetails: any;
}

const INITIAL_STATE: ShopState = {
    products: new ProductCollections(),
    productDetails: null
};

export function shopReducer(state = INITIAL_STATE, action: ShopActions.ShopActions): ShopState {
    switch (action.type) {
        case ShopActions.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}
