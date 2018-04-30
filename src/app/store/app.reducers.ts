import { ShopState, shopReducer } from './../public/shop/store/shop.reducers';
import { AuthState, authReducer } from './../public/auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: AuthState;
    shop: ShopState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    shop: shopReducer
};
