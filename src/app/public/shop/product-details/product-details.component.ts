import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_CONF, GALLERY_IMAGE } from 'ngx-image-gallery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // https://www.onedayonly.co.za/light-room-mini-portable-photo-studio-light-box-3.html

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  galleryConf: GALLERY_CONF = {
    imageOffset: '0px',
    showCloseControl: false,
    showDeleteControl: false,
    showImageTitle: false,
    inline: true
  };

  images: GALLERY_IMAGE[] = [
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_6006_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_6006_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    },
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_5997_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_5997_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    },
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_6008_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_6008_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    },
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_5995_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_5995_3_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    },
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_5993_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_5993_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    },
    {
      url: 'https://odo.imgix.net/media/catalog/product/i/m/img_5994_5_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=1000&or=0&w=1000',
      thumbnailUrl: 'https://odo.imgix.net/media/catalog/product/i/m/img_5994_5_1_1.jpg?auto=compress%2Cformat&bg=fff&fit=fillmax&h=200&or=0&w=200'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
