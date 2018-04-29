import { environment } from './../environments/environment';
import { NotAuthGuard } from './public/auth/not-auth.guard';
import { AuthModule } from './public/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginService } from './service/user-login.service';
import { UserRegistrationService } from './service/user-registration.service';
import { CognitoService } from './service/cognito.service';
import { ToolbarComponent } from './public/home/toolbar/toolbar.component';
import { HomeComponent } from './public/home/home.component';
import { ProductListComponent } from './public/home/product-list/product-list.component';
import { ProductComponent } from './public/home/product-list/product/product.component';
import { ProductDetailsComponent } from './public/home/product-details/product-details.component';
import { CartComponent } from './public/home/cart/cart.component';
import { FooterComponent } from './public/home/footer/footer.component';
import { CheckoutComponent } from './secure/checkout/checkout.component';
import '../rxjs.imports';
import { authReducer } from './public/auth/store/auth.reducers';
import { AuthEffects } from './public/auth/store/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    FooterComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFontAwesomeModule,

    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    CognitoService,
    UserRegistrationService,
    UserLoginService,
    NotAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
