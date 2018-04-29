import { CheckoutComponent } from './secure/checkout/checkout.component';
import { ProductDetailsComponent } from './public/home/product-details/product-details.component';
import { ProductListComponent } from './public/home/product-list/product-list.component';
import { HomeComponent } from './public/home/home.component';
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
        redirectTo: 'home'
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'registrationConfirmation/:email',
                component: ConfirmComponent
            },
            {
                path: 'registrationConfirmation',
                component: ConfirmComponent
            },
            {
                path: 'forgotPassword',
                component: ForgotPasswordStep1Component
            },
            {
                path: 'forgotPassword/:email',
                component: ForgotPasswordStep2Component
            },
            {
                path: 'resendCode',
                component: ResendCodeComponent
            },
            {
                path: 'newPassword',
                component: NewpasswordComponent
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: ProductListComponent
            },
            {
                path: ':category/:productName',
                component: ProductDetailsComponent
            }
        ]
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
