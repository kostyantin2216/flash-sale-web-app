import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnDestroy {

  @Output() complete = new EventEmitter<any>();

  second: number;
  minute: number;
  hour: number;

  private countdownSub: Subscription;

  constructor() { }

  ngOnDestroy() {
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }
  }

  @Input()
  set millis(millis: number) {
    console.log('setting millis');
    this.second = Math.floor((millis / 1000) % 60);
    this.minute = Math.floor((millis / (1000 * 60)) % 60);
    this.hour = Math.floor((millis / (1000 * 60 * 60)) % 24);

    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }

    this.countdownSub = Observable.timer(0, 1000)
                                  .subscribe(() => this.countdown());
  }

  countdown() {
    this.second--;

    if (this.second < 0) {
      this.second = 59;
      this.minute--;

      if (this.minute < 0) {
        this.minute = 59;
        this.hour--;

        if (this.hour < 0) {
          this.second = 0;
          this.minute = 0;
          this.hour = 0;

          this.complete.emit();

          if (this.countdownSub) {
            this.countdownSub.unsubscribe();
            this.countdownSub = null;
          }
        }
      }
    }
  }

}
