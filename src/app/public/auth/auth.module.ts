import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotPasswordStep1Component } from './forgot-pass/step-1/forgot-password-step-1.component';
import { ForgotPasswordStep2Component } from './forgot-pass/step-2/forgot-password-step-2.component';
import { ResendCodeComponent } from './resend-code/resend-code.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
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
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
