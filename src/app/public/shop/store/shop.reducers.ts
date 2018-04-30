import { SummarizedProduct } from './../../../service/product.service';
import * as ShopActions from "./shop.actions";

export interface ShopState {
    products: SummarizedProduct[];
    productDetails: any;
}

const INITIAL_STATE: ShopState = {
    products: [],
    productDetails: null
};

export function shopReducer(state = INITIAL_STATE, action: ShopActions.ShopActions) {
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
