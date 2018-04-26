import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { ForgotPasswordStep1Component } from './auth/forgot/step-1/forgot-password-step-1.component';
import { ForgotPasswordStep2Component } from './auth/forgot/step-2/forgot-password-step-2.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'confirm/:email',
        component: ConfirmComponent
    },
    {
        path: 'confirm',
        component: ConfirmComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordStep1Component
    },
    {
        path: 'forgotPassword/:email',
        component: ForgotPasswordStep2Component
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
