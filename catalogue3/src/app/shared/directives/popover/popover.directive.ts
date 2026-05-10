import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPopover]',
  standalone: false,
})
export class PopoverDirective {
  constructor(private readonly el: ElementRef) {}
}
