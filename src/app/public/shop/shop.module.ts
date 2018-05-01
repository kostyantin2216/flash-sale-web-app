import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShopRoutingModule } from './shop-routing.module';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ShopComponent } from './shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductSectionComponent } from './product-section/product-section.component';

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
        BrowserModule,
        ShopRoutingModule,
        AngularFontAwesomeModule
    ]
})
export class ShopModule { }
