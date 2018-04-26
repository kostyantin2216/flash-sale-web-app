import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginService } from './service/user-login.service';
import { UserRegistrationService } from './service/user-registration.service';
import { CognitoService } from './service/cognito.service';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { ForgotPasswordStep1Component } from './auth/forgot/step-1/forgot-password-step-1.component';
import { ForgotPasswordStep2Component } from './auth/forgot/step-2/forgot-password-step-2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component
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
