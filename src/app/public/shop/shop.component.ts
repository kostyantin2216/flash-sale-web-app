import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LOAD_PRODUCTS } from './store/shop.actions';
import { AppState } from './../../store/app.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  showingLoader$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.showingLoader$ = this.store.pipe(select(state => state.shop.showingLoader));
  }

}
