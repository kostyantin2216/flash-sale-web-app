import { Observable } from 'rxjs/Observable';
import { SummarizedProduct } from './../../../service/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from '../../../store/app.reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {
  @Input() title: string;
  @Input() name: string;
  @Output() productSelected = new EventEmitter<SummarizedProduct>();

  products$: Observable<SummarizedProduct[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => state.shop.products[name].content);
  }

  selectProduct(product: SummarizedProduct) {
    this.productSelected.emit(product);
  }

}
