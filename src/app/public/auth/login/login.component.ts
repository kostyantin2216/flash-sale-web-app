import { CognitoAuthService } from './../../../service/cognito-auth.service';
import { LOGIN, LOAD_USER } from './../store/auth.actions';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoginService, AuthenticationResult } from './../../../service/user-login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CognitoService } from '../../../service/cognito.service';
import { AppState } from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: string;
  email: string;

  fragmentSub: Subscription;

  constructor(
    private cognitoAuth: CognitoAuthService,
    private cognitoService: CognitoService,
    private userLoginService: UserLoginService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.fragmentSub = this.route.fragment.subscribe((fragment: string) => {
      if (fragment && fragment.startsWith('access_token')) {
        this.cognitoAuth.login();
      }
    });
  }

  ngOnDestroy() {
    this.fragmentSub.unsubscribe();
  }

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

  facebookLogin() {
    this.cognitoAuth.login();
  }

}
