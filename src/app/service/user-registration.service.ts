import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { NewPasswordUser } from './../public/auth/newpassword/newpassword.component';
import { RegistrationUser } from './../public/auth/register/register.component';
import { Inject, Injectable } from "@angular/core";
import { CognitoService } from "./cognito.service";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, ISignUpResult, CognitoUserSession } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

@Injectable()
export class UserRegistrationService {

    constructor(
      @Inject(CognitoService) public cognitoService: CognitoService
    ) { }

    register(user: RegistrationUser): Observable<ISignUpResult> {
        return Observable.create((observer: Observer<ISignUpResult>) => {
            const attributeList = [];

            attributeList.push(new CognitoUserAttribute({
              Name: 'email',
              Value: user.email
            }));
            attributeList.push(new CognitoUserAttribute({
              Name: 'given_name',
              Value: user.firstname
            }));
            attributeList.push(new CognitoUserAttribute({
              Name: 'family_name',
              Value: user.lastname
            }));
            attributeList.push(new CognitoUserAttribute({
                Name: 'phone_number',
                Value: user.telephone
            }));

            this.cognitoService.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(result);
                }
                observer.complete();
            });
        });
    }

    confirmRegistration(email: string, confirmationCode: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            const userData = {
                Username: email,
                Pool: this.cognitoService.getUserPool()
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(result);
                }
                observer.complete();
            });
        });
    }

    resendCode(email: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            const userData = {
                Username: email,
                Pool: this.cognitoService.getUserPool()
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.resendConfirmationCode(function (err, result) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(null);
                }
                observer.complete();
            });
        });
    }

    newPassword(newPasswordUser: NewPasswordUser): Observable<CognitoUserSession> {
        return Observable.create((observer: Observer<CognitoUserSession>) => {
            let authenticationData = {
                Username: newPasswordUser.username,
                Password: newPasswordUser.existingPassword,
            };
            let authenticationDetails = new AuthenticationDetails(authenticationData);
            let userData = {
                Username: newPasswordUser.username,
                Pool: this.cognitoService.getUserPool()
            };

            console.log("UserLoginService: Params set...Authenticating the user");
            let cognitoUser = new CognitoUser(userData);
            console.log("UserLoginService: config is " + AWS.config);

            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    // User was signed up by an admin and must provide new
                    // password and required attributes, if any, to complete
                    // authentication.
                    // the api doesn't accept this field back
                    delete userAttributes.email_verified;
                    cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                        onSuccess: onSuccess,
                        onFailure: onError
                    });
                },
                onSuccess: onSuccess,
                onFailure: onError
            });

            function onSuccess(result: CognitoUserSession) {
                observer.next(result);
                observer.complete();
            }

            function onError(err) {
                observer.error(err);
                observer.complete();
            }
        });
    }

}
