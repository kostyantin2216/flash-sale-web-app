import { ProductDetailsGuard } from './public/shop/product-details/product-details.guard';
import { S3Service } from './service/s3.service';
import { CognitoAuthService } from './service/cognito-auth.service';
import { ProductService } from './service/product.service';
import { environment } from './../environments/environment';
import { NotAuthGuard } from './public/auth/not-auth.guard';
import { AuthModule } from './public/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginService } from './service/user-login.service';
import { UserRegistrationService } from './service/user-registration.service';
import { CognitoService } from './service/cognito.service';
import { CheckoutComponent } from './secure/checkout/checkout.component';
import '../rxjs.imports';
import { authReducer } from './public/auth/store/auth.reducers';
import { AuthEffects } from './public/auth/store/auth.effects';
import { ShopModule } from './public/shop/shop.module';
import { reducers } from './store/app.reducers';
import { ShopEffects } from './public/shop/store/shop.effects';
import { FixedTitleDirective } from './shared/fixed-title.directive';
import { CounterInputComponent } from './shared/counter-input/counter-input.component';
import { ProductListGuard } from './public/shop/product-list/product-list.guard';


@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    FixedTitleDirective
  ],
  imports: [
    BrowserModule,
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
    S3Service,
    NotAuthGuard,
    ProductListGuard,
    ProductDetailsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
