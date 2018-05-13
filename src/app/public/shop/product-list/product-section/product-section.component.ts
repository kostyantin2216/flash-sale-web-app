import { ProductCollection } from './../../../../service/product/product-collection.model';
import { SummarizedProduct } from './../../../../service/product/summarized-product.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { AppState } from '../../../../store/app.reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {
  @Input() name: string;
  @Output() productSelected = new EventEmitter<SummarizedProduct>();
  @Output() sectionPosition = new EventEmitter();

  products$: Observable<ProductCollection>;

  constructor(
    private store: Store<AppState>,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => {
      return state.shop.products[this.name];
    });
    this.sectionPosition.emit({ name: this.name, position: this.el.nativeElement.offsetTop });
  }

  selectProduct(product: SummarizedProduct) {
    this.productSelected.emit(product);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sectionPosition.emit({ name: this.name, position: this.el.nativeElement.offsetTop });
  }

}
