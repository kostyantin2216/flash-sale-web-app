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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    ResendCodeComponent,
    NewpasswordComponent
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
