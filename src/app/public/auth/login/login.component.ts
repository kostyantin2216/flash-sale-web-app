import { element } from 'protractor';
import { Router } from '@angular/router';
import { CognitoCallback, LoggedInCallback } from './../../../service/cognito.service';
import { UserLoginService } from './../../../service/user-login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, CognitoCallback , LoggedInCallback { 

  errorMessage: string;
  email: string;

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userLoginService.isAuthenticated(this);
  }

  performLogin(form: NgForm) {
    this.errorMessage = null;
    if(form.valid) {
      this.email = form.value.email;
      this.userLoginService.authenticate(form.value.email, form.value.password, this);
    }
  }

  cognitoCallback(message: string, result: any) {
    if(message) {
      if (message === 'User is not confirmed.') {
        this.router.navigate(['/registrationConfirmation', this.email]);
      } else if (message === 'User needs to set password.') {
        this.router.navigate(['/newPassword'], {
          queryParams: {
            email: this.email
          }
        });
      } else {
        this.errorMessage = message;
      }
    } else {
      this.isLoggedIn(message, true);
    }
  }

  isLoggedIn(message: string, loggedIn: boolean) {
    if(this.isLoggedIn) {
      // TODO: redirect home
    }
  }

}
