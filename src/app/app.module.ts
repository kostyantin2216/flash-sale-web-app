import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginService } from './service/user-login.service';
import { UserRegistrationService } from './service/user-registration.service';
import { CognitoService } from './service/cognito.service';
import { ConfirmComponent } from './public/auth/confirm/confirm.component';
import { ForgotPasswordStep1Component } from './public/auth/forgot-pass/step-1/forgot-password-step-1.component';
import { ForgotPasswordStep2Component } from './public/auth/forgot-pass/step-2/forgot-password-step-2.component';
import { ResendCodeComponent } from './public/auth/resend-code/resend-code.component';
import { NewpasswordComponent } from './public/auth/newpassword/newpassword.component';
import { ToolbarComponent } from './public/home/toolbar/toolbar.component';
import { HomeComponent } from './public/home/home.component';
import { ProductListComponent } from './public/home/product-list/product-list.component';
import { ProductComponent } from './public/home/product-list/product/product.component';
import { ProductDetailsComponent } from './public/home/product-details/product-details.component';
import { CartComponent } from './public/home/cart/cart.component';
import { FooterComponent } from './public/home/footer/footer.component';
import { CheckoutComponent } from './secure/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    ResendCodeComponent,
    NewpasswordComponent,
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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CognitoService,
    UserRegistrationService,
    UserLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
