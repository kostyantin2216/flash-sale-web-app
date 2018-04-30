import { AppState } from './../store/app.reducers';
import { environment } from './../../environments/environment';
import { CognitoService } from './cognito.service';
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { LOAD_USER } from './../public/auth/store/auth.actions';

export class AuthenticationResult {
    constructor(
        public message: string,
        public authenticated: boolean
    ) { }
}

@Injectable()
export class UserLoginService {

  private onLoginSuccess = (observer: Observer<CognitoUserSession>, session: CognitoUserSession) => {

    console.log("In authenticateUser onSuccess callback");

    AWS.config.credentials = this.cognitoService.buildCognitoCreds(session.getIdToken().getJwtToken());

    // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
    // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
    // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
    // security credentials. The identity is then injected directly into the credentials object.
    // If the first SDK call we make wants to use our IdentityID, we have a
    // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
    // very innocuous API call that forces this behavior.
    let clientParams: any = {};
    let sts = new STS(clientParams);
    sts.getCallerIdentity(function (err, data) {
        console.log("UserLoginService: Successfully set the AWS credentials");
        observer.next(session);
        observer.complete();
    });
  }

  private onLoginError = (observer: Observer<CognitoUserSession>, err) => {
    observer.error(err);
    observer.complete();
  }

  constructor(
    private cognitoService: CognitoService,
    private store: Store<AppState>
  ) { }

  authenticate(username: string, password: string): Observable<CognitoUserSession> {
    return Observable.create((observer: Observer<CognitoUserSession>) => {
        console.log("UserLoginService: starting the authentication");

        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        console.log("UserLoginService: Params set...Authenticating the user");
        const cognitoUser = new CognitoUser(userData);
        console.log("UserLoginService: config is " + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                observer.error(`User needs to set password.`);
                observer.complete();
            },
            onSuccess: result => {
                this.onLoginSuccess(observer, result);

            this.store.dispatch({
              type: LOAD_USER,
              payload: cognitoUser
            });
            },
            onFailure: err => this.onLoginError(observer, err)
        });
    });
  }

  forgotPassword(username: string): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
        let userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function () {
                observer.next(null);
                observer.complete();
            },
            onFailure: function (err) {
                observer.error(err);
                observer.complete();
            },
            inputVerificationCode() {
                observer.next(null);
                observer.complete();
            }
        });
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string): Observable<void> {
      return Observable.create((observer: Observer<void>) => {
        let userData = {
            Username: email,
            Pool: this.cognitoService.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
                observer.next(null);
                observer.complete();
            },
            onFailure: function (err) {
                observer.error(err);
                observer.complete();
            }
        });
      });
  }

  logout() {
      this.cognitoService.getCurrentUser().signOut();
  }

  isAuthenticated(): Observable<boolean> {
      let cognitoUser = this.cognitoService.getCurrentUser();

      if (cognitoUser != null) {
          return Observable.create((observer: Observer<boolean>) => {
              cognitoUser.getSession(function (err, session) {
                  if (err) {
                      console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                      observer.error(err);
                  }
                  else {
                      console.log("UserLoginService: Session is " + session.isValid());
                      observer.next(session.isValid());
                  }
                  observer.complete();
              });
        });
      } else {
          console.log("UserLoginService: can't retrieve the current user");
          return Observable.of(false);
      }
  }

}
