import { CognitoAuthService } from './../../../service/cognito-auth.service';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UserRegistrationService } from './../../../service/user-registration.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom-validators.utility';

export class RegistrationUser {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMsg: string;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private authService: CognitoAuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstname: [
        '',
        Validators.required
      ],
      lastname: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.email
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      confirmPassword: [
        ''
      ],
      telephone: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.telephone
        ])
      ]
    }, {
      validator: CustomValidators.Match('password', 'confirmPassword')
    });
  }

  performRegistration() {
    this.errorMsg = null;
    this.submitted = true;
    if (this.registerForm.valid) {
      const user: RegistrationUser = this.registerForm.value;
      this.userRegistrationService.register(user).subscribe(
        (result: ISignUpResult) => {
          this.router.navigate(['/auth', 'registrationConfirmation', result.user.getUsername()]);
        },
        err => {
          this.errorMsg = err.message;
        }
      );
    }
  }

  loginWithFacebook() {
    this.authService.login();
  }

  isInvalid(cntrl: FormControl) {
    return cntrl.invalid && (cntrl.dirty || cntrl.touched || this.submitted);
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

}
