import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { OrderedProduct } from '../../../../service/product/ordered-product.model';
import { AppState } from '../../../../store/app.reducers';
import * as ShopActions from './../../store/shop.actions';
import { Router } from '@angular/router';
import { getTotalStockCount } from '../../../../service/product/product-variants.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  @Input() product: OrderedProduct;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.product.name, 'stock' in this.product.variants);
  }

  removeProduct() {
    this.store.dispatch(new ShopActions.RemoveFromCart(this.product));
  }

  viewProduct() {
    this.store.dispatch(new ShopActions.ToggleCart());
    this.router.navigate(['/shop', this.product.brand, this.product.name]);
  }

  get stockCount() {
    return getTotalStockCount(this.product.variants);
  }

}
