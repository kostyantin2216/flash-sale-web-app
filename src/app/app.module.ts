import { CartGuard } from './public/shop/cart/cart.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ProductDetailsGuard } from './public/shop/product-details/product-details.guard';
import { S3Service } from './service/aws/s3.service';
import { CognitoAuthService } from './service/aws/cognito-auth.service';
import { ProductService } from './service/product/product.service';
import { environment } from './../environments/environment';
import { NotAuthGuard } from './public/auth/not-auth.guard';
import { AuthModule } from './public/auth/auth.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginService } from './service/user/user-login.service';
import { UserRegistrationService } from './service/user/user-registration.service';
import { CognitoService } from './service/aws/cognito.service';
import { CheckoutComponent } from './secure/checkout/checkout.component';
import { authReducer } from './public/auth/store/auth.reducers';
import { AuthEffects } from './public/auth/store/auth.effects';
import { ShopModule } from './public/shop/shop.module';
import { reducers } from './store/app.reducers';
import { ShopEffects } from './public/shop/store/shop.effects';
import { FixedTitleDirective } from './shared/fixed-title.directive';
import { CounterInputComponent } from './shared/counter-input/counter-input.component';
import { ProductListGuard } from './public/shop/product-list/product-list.guard';
import { ShoppingCartService } from './service/cart/shopping-cart.service';

import '../rxjs.imports';


@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    FixedTitleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AuthModule,
    ShopModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ShopEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    CognitoAuthService,
    CognitoService,
    UserRegistrationService,
    UserLoginService,
    ProductService,
    ShoppingCartService,
//    S3Service,
    NotAuthGuard,
    ProductListGuard,
    ProductDetailsGuard,
    CartGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
