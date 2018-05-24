import { CounterInputComponent } from './../../shared/counter-input/counter-input.component';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShopRoutingModule } from './shop-routing.module';
import { NgModule, forwardRef } from '@angular/core';
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
import { ProductVariantsComponent } from './product-details/product-variants/product-variants.component';
import { CartProductComponent } from './cart/cart-product/cart-product.component';
import { CartToolbarComponent } from './cart/cart-toolbar/cart-toolbar.component';
import { CartExpiryPopupComponent } from './cart/cart-expiry-popup/cart-expiry-popup.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        ShopComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailsComponent,
        CartComponent,
        FooterComponent,
        ProductSectionComponent,
        ProductVariantsComponent,
        CartProductComponent,
        CartToolbarComponent,
        CartExpiryPopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ShopRoutingModule,
        AngularFontAwesomeModule,
        ScrollToModule.forRoot(),
        NgxImageGalleryModule,
        SharedModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CounterInputComponent),
            multi: true
        }
    ]
})
export class ShopModule { }
