import { FormControl, NgForm } from '@angular/forms';
import { UserLoginService } from './../../../../service/user-login.service';
import { Router } from '@angular/router';
import { CognitoCallback } from './../../../../service/cognito.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password-step-1',
  templateUrl: './forgot-password-step-1.component.html',
  styleUrls: ['./forgot-password-step-1.component.scss']
})
export class ForgotPasswordStep1Component implements CognitoCallback {

  email: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) { }

  onNext(form: NgForm) {
      this.errorMessage = null;
      if(form.valid) {
          this.email = form.value['email'];
          this.userLoginService.forgotPassword(this.email, this);
      }
  }

  cognitoCallback(message: string, result: any) {
      if (message == null && result == null) {
          this.router.navigate(['/forgotPassword', this.email]);
      } else {
          this.errorMessage = message;
      }
  }

}
