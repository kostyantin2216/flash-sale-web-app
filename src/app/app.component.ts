import { AppState } from './store/app.reducers';
import { LOGIN, LOAD_USER } from './public/auth/store/auth.actions';
import { Component, OnInit } from '@angular/core';
import { CognitoService } from './service/aws/cognito.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private cognitoService: CognitoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    let cognitoUser = this.cognitoService.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (!err && session.isValid()) {
          this.store.dispatch({
            type: LOGIN,
            payload: session
          });
          this.store.dispatch({
            type: LOAD_USER,
            payload: cognitoUser
          });
        }
      });
    }
  }

}
