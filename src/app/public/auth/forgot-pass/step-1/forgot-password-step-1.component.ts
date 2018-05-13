import { FormControl, NgForm } from '@angular/forms';
import { UserLoginService } from './../../../../service/user/user-login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-forgot-password-step-1',
  templateUrl: './forgot-password-step-1.component.html',
  styleUrls: ['./forgot-password-step-1.component.scss']
})
export class ForgotPasswordStep1Component implements OnInit, OnDestroy {

  email: string;
  errorMessage: string;

  private emailSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userLoginService: UserLoginService
  ) { }

  ngOnInit() {
    this.emailSub = this.route.queryParams.subscribe((params: Params) => {
        this.email = params['email'];
    });
  }

  ngOnDestroy() {
      this.emailSub.unsubscribe();
  }

  onNext(form: NgForm) {
      this.errorMessage = null;
      if (form.valid) {
          this.email = form.value['email'];
          this.userLoginService.forgotPassword(this.email).subscribe(
              () => {
                this.router.navigate(['/auth', 'forgotPassword', this.email]);
              },
              err => {
                  this.errorMessage = err.message;
              }
          );
      }
  }

}
