import { CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';
import { Action } from '@ngrx/store';
import { User } from '../../../shared/user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const LOAD_USER = 'LOAD_USER';
export const CLEAR = 'CLEAR';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(
        public payload: CognitoUserSession
    ) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(
        public payload: User
    ) { }
}

export class LoadUser implements Action {
    readonly type = LOAD_USER;

    constructor(
        public payload: CognitoUser
    ) { }
}

export class Clear implements Action {
    readonly type = CLEAR;
}

export type AuthActions = Login| Logout | SetUser | LoadUser | Clear;
