import { LOAD_PRODUCTS } from './store/shop.actions';
import { AppState } from './../../store/app.reducers';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: LOAD_PRODUCTS });
  }

}
