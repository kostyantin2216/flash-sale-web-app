import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_CONF, GALLERY_IMAGE } from 'ngx-image-gallery';
import { S3Service } from '../../../service/s3.service';
import { AppState } from '../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { TOGGLE_LOADER, LOAD_PRODUCT_DETAILS } from '../store/shop.actions';
import { DetailedProduct } from '../../../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  // https://www.onedayonly.co.za/light-room-mini-portable-photo-studio-light-box-3.html

  productDetails$: Observable<DetailedProduct>;
  desciptionBody$: Observable<string>;

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  galleryConf: GALLERY_CONF = {
    imageOffset: '0px',
    showCloseControl: false,
    showDeleteControl: false,
    showImageTitle: false,
    inline: true
  };

  constructor(
    private s3Service: S3Service,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productDetails$ = this.store.pipe(select(state => state.shop.productDetails));
    this.productDetails$.take(1).subscribe((details: DetailedProduct) => {
      this.desciptionBody$ = this.s3Service.fetchProductDescription(details.description);
    });
  }

  ngOnDestroy() {
  }

}
