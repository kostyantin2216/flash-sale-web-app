import { CheckoutComponent } from './secure/checkout/checkout.component';
import { NewpasswordComponent } from './public/auth/newpassword/newpassword.component';
import { ResendCodeComponent } from './public/auth/resend-code/resend-code.component';
import { RegisterComponent } from './public/auth/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/auth/login/login.component';
import { ConfirmComponent } from './public/auth/confirm/confirm.component';
import { ForgotPasswordStep1Component } from './public/auth/forgot-pass/step-1/forgot-password-step-1.component';
import { ForgotPasswordStep2Component } from './public/auth/forgot-pass/step-2/forgot-password-step-2.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'shop'
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
