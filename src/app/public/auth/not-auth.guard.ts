import { AppState } from './../../store/app.reducers';
import { LOGIN } from './store/auth.actions';
import { Observer } from 'rxjs/Observer';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserLoginService } from './../../service/user-login.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthState } from './store/auth.reducers';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isatty } from 'tty';
import { CognitoService } from '../../service/cognito.service';

/**
 * We only activate if we are NOT authenticated
 */
@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
      private store: Store<AppState>,
      private cognitoService: CognitoService,
      private loginService: UserLoginService,
      private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
        .take(1)
        .switchMap((authState: AuthState) => {
          if (authState.authenticated) {
            return Observable.of(false);
          } else {
            return this.loginService.isAuthenticated().map((isAuthenticated: boolean) => !isAuthenticated);
          }
        })
        .do((canActivate: boolean) => {
          if (!canActivate) {
            this.router.navigate(['/']);
          }
        });
  }
}
