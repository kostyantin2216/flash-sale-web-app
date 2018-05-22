import { ShoppingCartState } from './../../../service/cart/shopping-cart.state';
import { ShoppingCart } from './../../../service/cart/shopping-cart.model';
import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { ProductCollections } from './../../../service/product/product-collections.model';
import * as ShopActions from "./shop.actions";
import { ShoppingCartService } from '../../../service/cart/shopping-cart.service';

export interface ShopState {
    cart: ShoppingCart;
    products: ProductCollections;
    productDetails: DetailedProduct;
    showingLoader: boolean;
    showingCart: boolean;
    cartState: ShoppingCartState;
}

const INITIAL_STATE: ShopState = {
    cart: {
        token: null,
        products: []
    },
    products: new ProductCollections(),
    productDetails: null,
    showingLoader: true,
    showingCart: false,
    cartState: ShoppingCartState.IDLE
};

export function shopReducer(state = INITIAL_STATE, action: ShopActions.ShopActions): ShopState {
    switch (action.type) {
        case ShopActions.TOGGLE_LOADER:
            let showLoader = action.payload === undefined || action.payload === null ? !state.showingLoader : action.payload;
            return {
                ...state,
                showingLoader: showLoader
            };
        case ShopActions.TOGGLE_CART:
            let showCart = action.payload === undefined || action.payload === null ? !state.showingCart : action.payload;
            return {
                ...state,
                showingCart: showCart
            };
        case ShopActions.SET_CART_STATE:
            return {
                ...state,
                cartState: action.payload
            };
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
        case ShopActions.SET_CART:
            return {
                ...state,
                cart: action.payload
            };
        default:
            return state;
    }
}
