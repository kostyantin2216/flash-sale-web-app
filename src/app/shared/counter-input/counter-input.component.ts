import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss']
})
export class CounterInputComponent implements ControlValueAccessor {

  @Input() _counterValue = 1;
  @Input() max = 99;
  @Input() min = 1;

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

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(this._counterValue);
  }

}
