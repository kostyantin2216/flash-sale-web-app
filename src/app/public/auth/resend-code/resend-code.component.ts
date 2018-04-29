import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserRegistrationService } from './../../../service/user-registration.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-resend-code',
  templateUrl: './resend-code.component.html',
  styleUrls: ['./resend-code.component.scss']
})
export class ResendCodeComponent implements OnInit, OnDestroy {

  email: string;
  errorMessage: string;

  private emailSub: Subscription;

  constructor(
    private registrationService: UserRegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.emailSub = this.route.queryParams.subscribe((params: Params) => {
        this.email = params['email'];
    });
  }

  ngOnDestroy() {
      this.emailSub.unsubscribe();
  }

  resendCode() {
      this.registrationService.resendCode(this.email).subscribe(
          () => {
            this.router.navigate(['/auth', 'registrationConfirmation', this.email]);
          },
          err => {
              this.errorMessage = "Something went wrong...please try again";
          }
      );
  }

}
