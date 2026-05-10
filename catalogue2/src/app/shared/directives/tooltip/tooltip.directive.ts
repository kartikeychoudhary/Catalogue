import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: false,
})
export class TooltipDirective implements OnDestroy {
  @Input({ required: true }) appTooltip = '';

  private tooltipEl?: HTMLElement;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipEl) return;
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'tooltip');

    const text = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.tooltipEl, text);

    const arrow = this.renderer.createElement('span');
    this.renderer.addClass(arrow, 'tooltip-arrow');
    this.renderer.appendChild(this.tooltipEl, arrow);

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipEl);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroyTooltip();
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipEl);
      this.tooltipEl = undefined;
    }
  }
}
