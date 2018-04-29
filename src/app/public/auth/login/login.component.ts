import { LOGIN, LOAD_USER } from './../store/auth.actions';
import { AuthState } from './../store/auth.reducers';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { UserLoginService, AuthenticationResult } from './../../../service/user-login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CognitoService } from '../../../service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMessage: string;
  email: string;

  constructor(
    private cognitoService: CognitoService,
    private userLoginService: UserLoginService,
    private router: Router,
    private store: Store<AuthState>
  ) { }

  performLogin(form: NgForm) {
    this.errorMessage = null;
    if (form.valid) {
      this.email = form.value.email;
      this.userLoginService.authenticate(form.value.email, form.value.password).subscribe(
        (result: CognitoUserSession) => {
          this.router.navigate(['/']);
          this.store.dispatch({
            type: LOGIN,
            payload: result
          });
        },
        err => {
          if (err.message === 'User is not confirmed.') {
            this.router.navigate(['/auth', 'registrationConfirmation', this.email]);
          } else if (err.message === 'User needs to set password.') {
            this.router.navigate(['/auth', 'newPassword'], {
              queryParams: {
                email: this.email
              }
            });
          } else {
            this.errorMessage = err.message;
          }
        }
      );
    }
  }

}
