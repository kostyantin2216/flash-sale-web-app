import { ShopState, shopReducer } from './../public/shop/store/shop.reducers';
import { AuthState, authReducer } from './../public/auth/store/auth.reducers';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
    auth: AuthState;
    shop: ShopState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    shop: shopReducer
};

/* export const metaReducers: Array<MetaReducer<any, any>> = [localStoarageSyncReducer];

export function localStoarageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {shop: {
                reviver: (key, value) => {
                    console.log('reviving', key, value);
                    if (key === 'products') {
                        return [];
                    }
                    return value;
                },
                filter: ['cart']
            }}
        ],
        rehydrate: true
    })(reducer);
} */
