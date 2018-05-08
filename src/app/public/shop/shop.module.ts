import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShopRoutingModule } from './shop-routing.module';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ShopComponent } from './shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductSectionComponent } from './product-list/product-section/product-section.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        ShopComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailsComponent,
        CartComponent,
        FooterComponent,
        ProductSectionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ShopRoutingModule,
        AngularFontAwesomeModule,
        ScrollToModule.forRoot(),
        NgxImageGalleryModule,
        SharedModule
    ]
})
export class ShopModule { }
