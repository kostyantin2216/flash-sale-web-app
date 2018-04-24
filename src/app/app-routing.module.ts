import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }