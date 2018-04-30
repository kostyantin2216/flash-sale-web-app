import { CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AuthActions from './auth.actions';
import { User } from './../../../shared/user.model';
import { ServerlessApplicationRepository } from 'aws-sdk/clients/all';

export interface AuthState {
    authenticated: boolean;
    session: CognitoUserSession;
    user: User;
}

const INITIAL_STATE: AuthState = {
    authenticated: false,
    session: null,
    user: {
        firstName: 'Guest',
        lastName: null,
        email: null,
        telephone: null
    }
};

export function authReducer(state = INITIAL_STATE, action: AuthActions.AuthActions): AuthState {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                authenticated: true,
                session: action.payload
            };
        case AuthActions.CLEAR:
            return INITIAL_STATE;
        case AuthActions.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
