import { Store, select } from '@ngrx/store';
import { AppState } from './../../../store/app.reducers';
import { SummarizedProduct, ProductCollections } from './../../../service/product.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  sections = Object.keys(new ProductCollections());

  constructor() { }

  ngOnInit() { }

  productSelected(product) {
    console.log(JSON.stringify(product));
  }

}
