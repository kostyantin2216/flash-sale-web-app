import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFixedTitle]'
})
export class FixedTitleDirective {

  constructor(
    private el: ElementRef
  ) { }

}
