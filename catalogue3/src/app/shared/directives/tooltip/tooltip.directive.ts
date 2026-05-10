import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: false,
})
export class TooltipDirective {
  constructor(private readonly el: ElementRef) {}
}
