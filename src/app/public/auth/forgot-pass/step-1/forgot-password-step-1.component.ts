import { UserLoginService } from './../../../service/user-login.service';
import { Router } from '@angular/router';
import { CognitoCallback } from './../../../service/cognito.service';
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
    private userService: UserLoginService
  ) { }

  onNext() {
      this.errorMessage = null;
    //  this.userService.forgotPassword(this.email, this);
  }

  cognitoCallback(message: string, result: any) {
      if (message == null && result == null) {
          this.router.navigate(['/home/forgotPassword', this.email]);
      } else {
          this.errorMessage = message;
      }
  }

}
