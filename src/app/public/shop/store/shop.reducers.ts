import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { ProductCollections } from './../../../service/product/product-collections.model';
import * as ShopActions from "./shop.actions";

export interface ShopState {
    products: ProductCollections;
    productDetails: DetailedProduct;
    showingLoader: boolean;
}

const INITIAL_STATE: ShopState = {
    products: new ProductCollections(),
    productDetails: null,
    showingLoader: true
};

export function shopReducer(state = INITIAL_STATE, action: ShopActions.ShopActions): ShopState {
    switch (action.type) {
        case ShopActions.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case ShopActions.SET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload
            };
        case ShopActions.TOGGLE_LOADER:
            let showLoader = action.payload === undefined || action.payload === null ? !state.showingLoader : action.payload;
            return {
                ...state,
                showingLoader: showLoader
            };
        default:
            return state;
    }
}
