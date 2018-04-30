import { Store, select } from '@ngrx/store';
import { AppState } from './../../../store/app.reducers';
import { SummarizedProduct } from './../../../service/product.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<SummarizedProduct[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.pipe(select(state => state.shop.products));
  }

  productSelected(product) {
    console.log(JSON.stringify(product));
  }

}
