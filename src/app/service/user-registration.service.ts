import { RegistrationUser } from './../auth/register/register.component';
import { Inject, Injectable } from "@angular/core";
import { CognitoCallback, CognitoService } from "./cognito.service";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

@Injectable()
export class UserRegistrationService {

    constructor(
      @Inject(CognitoService) public cognitoService: CognitoService
    ) { }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log("UserRegistrationService: user is " + user);

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
                callback.cognitoCallback(err.message, null);
            } else {
                console.log("UserRegistrationService: registered user is " + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(email: string, confirmationCode: string, callback: CognitoCallback): void {
        const userData = {
            Username: email,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(email: string, callback: CognitoCallback): void {
        const userData = {
            Username: email,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}
