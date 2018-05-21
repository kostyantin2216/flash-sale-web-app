import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss']
})
export class CounterInputComponent implements ControlValueAccessor {

  private _counterValue = 1;
  private _max = 99;
  private _min = 1;

  private propagateChange = (_: any) => {};

  increment() {
    if (this.counterValue < this.max) {
      this.counterValue++;
    }
  }

  decrement() {
    if (this.counterValue > this.min) {
      this.counterValue--;
    }
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  get counterValue() {
    return this._counterValue;
  }

  @Input()
  set counterValue(val: number) {
    if (this._counterValue !== val) {
      if (val < this.min) {
        this._counterValue = this.min;
      } else if (val > this.max) {
        this._counterValue = this.max;
      } else {
        this._counterValue = val;
      }
      this.propagateChange(this._counterValue);
    }
  }

  get max() {
    return this._max;
  }

  @Input()
  set max(value: number) {
    this._max = value;
    if (this.counterValue > value) {
      this.counterValue = value;
    }
  }

  get min() {
    return this._min;
  }

  @Input()
  set min(value: number) {
    this._min = value;
    if (this.counterValue < value) {
      this.counterValue = value;
    }
  }

}
