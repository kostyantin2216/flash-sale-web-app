import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserRegistrationService } from '../../../service/user-registration.service';
import { CognitoCallback } from '../../../service/cognito.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy, CognitoCallback {

  emailModel: string;
  errorMsg: string;

  private emailSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userRegistrationService: UserRegistrationService
  ) { }

  ngOnInit() {
    this.emailSub = this.route.params.subscribe(params => {
      this.emailModel = params['email'];
    });
  }

  ngOnDestroy() {
    this.emailSub.unsubscribe();
  }

  processConfirmation(form: NgForm) {
    this.errorMsg = null;
    this.userRegistrationService.confirmRegistration(this.emailModel, form.value.confirmationCode, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message) {
      this.errorMsg = message;
    } else {
      this.router.navigate(['/login']);
    }
  }

}