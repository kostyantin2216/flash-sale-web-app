import { User } from './../../../shared/user.model';
import { Observer } from 'rxjs/Observer';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { Tokens } from './../../../shared/tokens.model';
import { UserLoginService } from './../../../service/user-login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthEffects {

    @Effect()
    loadUser = this.actions$
        .ofType(AuthActions.LOAD_USER)
        .map((action: AuthActions.LoadUser) => action.payload)
        .switchMap((cognitoUser: CognitoUser) => {
            return Observable.create((observer: Observer<CognitoUserAttribute[]>) => {
                cognitoUser.getUserAttributes((err: Error, result: CognitoUserAttribute[]) => {
                    if (err) {
                        console.log(err);
                        observer.error(err);
                    } else {
                        observer.next(result);
                    }
                });
            });
        })
        .map((attrs: CognitoUserAttribute[]) => {
            let user: User = { };
            for (let i = 0; i < attrs.length; i++) {
                let name = attrs[i].getName();
                switch (name) {
                    case 'given_name':
                        user.firstName = attrs[i].getValue();
                        break;
                    case 'family_name':
                        user.lastName = attrs[i].getValue();
                        break;
                    case 'email':
                        user.email = attrs[i].getValue();
                        break;
                    case 'phone_number':
                        user.telephone = attrs[i].getValue();
                        break;
                }
            }
            return {
                type: AuthActions.SET_USER,
                payload: user
            };
        });

    @Effect()
    logout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .map((action: AuthActions.Logout) => {
            this.loginService.logout();

            return {
                type: AuthActions.CLEAR
            };
        });

    constructor(
        private actions$: Actions,
        private loginService: UserLoginService
    ) { }

}
