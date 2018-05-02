import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserLoginService } from './../../../../service/user-login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from '../../../../shared/custom-validators.utility';

@Component({
  selector: 'app-forgot-password-step-2',
  templateUrl: './forgot-password-step-2.component.html',
  styleUrls: ['./forgot-password-step-2.component.scss']
})
export class ForgotPasswordStep2Component implements OnInit, OnDestroy {

    form: FormGroup;
    email: string;
    errorMessage: string;
    submitted = false;

    private sub: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserLoginService,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: Params) => {
            this.email = params['email'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    createForm() {
        this.form = this.fb.group({
            verificationCode: [
                '',
                Validators.required
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

    onNext() {
        this.submitted = true;
        this.errorMessage = null;
        if (this.form.valid) {
            this.userService.confirmNewPassword(
                this.email,
                this.verificationCode.value,
                this.password.value
            ).subscribe(
                () => {
                    this.router.navigate(['/auth', 'login']);
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

    get verificationCode() {
        return this.form.get('verificationCode');
    }

    get password() {
        return this.form.get('password');
    }

    get confirmPassword() {
        return this.form.get('confirmPassword');
    }

}
