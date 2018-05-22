import { ShoppingCartState } from './../../../service/cart/shopping-cart.state';
import { DetailedProduct } from './../../../service/product/detailed-product.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_CONF, GALLERY_IMAGE } from 'ngx-image-gallery';
import { AppState } from '../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { TOGGLE_LOADER, LOAD_PRODUCT_DETAILS } from '../store/shop.actions';
import * as ShopActions from './../store/shop.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // https://www.onedayonly.co.za/light-room-mini-portable-photo-studio-light-box-3.html

  productDetails$: Observable<DetailedProduct>;

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  images: GALLERY_IMAGE[] = [];

  galleryConf: GALLERY_CONF = {
    imageOffset: '0px',
    showCloseControl: false,
    showDeleteControl: false,
    showImageTitle: false,
    inline: true
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productDetails$ = this.store.pipe(select(state => state.shop.productDetails));
    this.productDetails$.take(1).subscribe((product: DetailedProduct) => {
      product.images.forEach(image => this.images.push({ url: image }));
    });
  }

  addToCart() {
    this.store.dispatch(new ShopActions.SetCartState(ShoppingCartState.ADDING));
    this.productDetails$.take(1).subscribe((product: DetailedProduct) => {
      this.store.dispatch(new ShopActions.AddToCart(product));
    });
    this.router.navigate(['/']);
  }

}
