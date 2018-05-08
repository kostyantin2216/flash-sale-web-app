import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LOAD_PRODUCTS } from './store/shop.actions';
import { AppState } from './../../store/app.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoaderService, LoaderState } from '../../service/loader.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  private loaderSub: Subscription;

  showLoader = false;

  constructor(
    private store: Store<AppState>,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: LOAD_PRODUCTS });
    this.loaderSub = this.loaderService.loaderState$.subscribe((state: LoaderState) => {
      this.showLoader = state === LoaderState.SHOWN;
      console.log(state);
    });
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }

}
