import { LOGIN, LOAD_USER } from './../public/auth/store/auth.actions';
import { AppState } from './../store/app.reducers';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import { environment } from '../../environments/environment';
import { CognitoService } from './cognito.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CognitoAuthService {
  private readonly auth: CognitoAuth;
  private session;

  constructor(
      private router: Router,
      private cognitoService: CognitoService,
      private store: Store<AppState>
    ) {
    this.auth = new CognitoAuth({
      ClientId: environment.clientId,
      AppWebDomain: environment.appWebDomain,
      TokenScopesArray: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      RedirectUriSignIn: this.callbackUrl,
      RedirectUriSignOut: this.callbackUrl,
    });
    this.auth.userhandler = {
      onSuccess: session => this.onSuccess(session),
      onFailure: () => this.onFailure(),
    };
  }

  // have to construct callbackUrl from "scratch",
  // as Angular doesn't appear to offer a native way to do it;
  // '/login' is my callback route
  private get callbackUrl() {
    return window.location.href.split('/').slice(0, 3).concat('auth/login').join('/');
    // or window.location.origin + '/login';
  }

  // gets called by the callback component
  login() {
    this.auth.parseCognitoWebResponse(this.router.url);
    this.auth.getSession();
  }

  // used to determine access in AuthGuard
  isAuthenticated() {
    return this.session && this.session.isValid();
  }

  private onSuccess(session) {
    this.session = session;
    this.router.navigateByUrl(this.guardedUrl);
    window.location.reload();
  }

  private onFailure() {
    this.session = undefined;
  }

  get accessToken() {
    return this.session && this.session.getAccessToken().getJwtToken();
  }

  // save and restore initial route upon redirect from Cognito-hosted page

  set guardedUrl(url: string) {
    localStorage.setItem('guardedUrl', url);
  }

  get guardedUrl() {
    return localStorage.getItem('guardedUrl') || '/';
  }
}
