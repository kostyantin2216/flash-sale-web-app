import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { OrderedProduct } from '../../../../service/product/ordered-product.model';
import { AppState } from '../../../../store/app.reducers';
import * as ShopActions from './../../store/shop.actions';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  @Input() product: OrderedProduct;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log(JSON.stringify(this.product));
  }

  removeProduct() {
    this.store.dispatch(new ShopActions.RemoveFromCart(this.product));
  }

}
