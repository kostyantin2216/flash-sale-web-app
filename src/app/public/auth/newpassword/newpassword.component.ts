import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Subscription } from 'rxjs/Subscription';
import { CustomValidators } from './../../../shared/custom-validators.utility';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserLoginService, AuthenticationResult } from './../../../service/user/user-login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRegistrationService } from '../../../service/user/user-registration.service';

export class NewPasswordUser {
  constructor(
    public username: string,
    public existingPassword: string,
    public password: string
  ) { }
}

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorMessage: string;
  submitted = false;

  private emailSub: Subscription;

  constructor(
    private userLoginService: UserLoginService,
    private userRegistrationService: UserRegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.emailSub = this.route.queryParams.subscribe((params: Params) => {
      this.email.setValue(params['email']);
    });
  }

  ngOnDestroy() {
    if (this.emailSub) {
      this.emailSub.unsubscribe();
    }
  }

  createForm() {
    this.form = this.fb.group({
      email: [
        '',
        Validators.email
      ],
      existingPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
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
      ]
    }, {
      validator: CustomValidators.Match('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;
    if (this.form.valid) {
      const user = new NewPasswordUser(
        this.form.value.email,
        this.form.value.existingPassword,
        this.form.value.password
      );

      this.userRegistrationService.newPassword(user).subscribe(
        (session: CognitoUserSession) => {
          this.router.navigate(['/']);
        },
        err => {
          this.errorMessage = err;
        }
      );
    }
  }

  isInvalid(cntrl: AbstractControl) {
    return cntrl.invalid && (cntrl.dirty || cntrl.touched || this.submitted);
  }

  get email() {
    return this.form.get('email');
  }

  get existingPassword() {
    return this.form.get('existingPassword');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

}
