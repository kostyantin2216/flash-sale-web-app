import { User } from '../../../service/user/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthState } from './../../auth/store/auth.reducers';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LOGOUT } from '../../auth/store/auth.actions';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  auth$: Observable<AuthState>;

  cartItems = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.auth$ = this.store.pipe(select('auth'));
  }

  logout() {
    this.store.dispatch({
      type: LOGOUT
    });
  }

}
