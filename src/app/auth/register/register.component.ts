import { Router } from '@angular/router';
import { UserRegistrationService } from './../../service/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { telephoneValidator } from '../../shared/telephone.validator';
import { CognitoCallback } from '../../service/cognito.service';

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
export class RegisterComponent implements OnInit, CognitoCallback {

  registerForm: FormGroup;
  errorMsg: string;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {
    this.createForm();
  }

  ngOnInit() {
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
      telephone: [
        '',
        Validators.compose([
          Validators.required,
          telephoneValidator()
        ])
      ]
    });
  }

  performRegistration() {
    this.errorMsg = null;
    this.submitted = true;
    const user: RegistrationUser = this.registerForm.value;
    this.userRegistrationService.register(user, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message) {
      this.errorMsg = message;
    } else {
      this.router.navigate(['/confirm', result.user.username]);
    }
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

}
