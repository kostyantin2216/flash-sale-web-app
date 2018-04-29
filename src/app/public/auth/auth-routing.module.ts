import { NewpasswordComponent } from './newpassword/newpassword.component';
import { ResendCodeComponent } from './resend-code/resend-code.component';
import { ForgotPasswordStep2Component } from './forgot-pass/step-2/forgot-password-step-2.component';
import { ForgotPasswordStep1Component } from './forgot-pass/step-1/forgot-password-step-1.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotAuthGuard } from './not-auth.guard';

const authRoutes: Routes = [
    {
        path: 'auth',
        canActivate: [ NotAuthGuard ],
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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
