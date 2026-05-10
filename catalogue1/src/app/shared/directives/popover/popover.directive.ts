import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appPopover]',
  standalone: false,
})
export class PopoverDirective implements OnDestroy {
  @Input({ required: true }) appPopover = '';
  @Input() popoverTitle = '';

  private popoverCard?: HTMLElement;
  private visible = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.visible) {
      this.hide();
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private show(): void {
    if (this.popoverCard) return;

    this.renderer.addClass(this.el.nativeElement, 'popover');

    this.popoverCard = this.renderer.createElement('div');
    this.renderer.addClass(this.popoverCard, 'popover-card');

    if (this.popoverTitle) {
      const title = this.renderer.createElement('h6');
      const titleText = this.renderer.createText(this.popoverTitle);
      this.renderer.appendChild(title, titleText);
      this.renderer.appendChild(this.popoverCard, title);
    }

    const content = this.renderer.createElement('p');
    const contentText = this.renderer.createText(this.appPopover);
    this.renderer.appendChild(content, contentText);
    this.renderer.appendChild(this.popoverCard, content);

    this.renderer.appendChild(this.el.nativeElement, this.popoverCard);
    this.visible = true;
  }

  private hide(): void {
    if (this.popoverCard) {
      this.renderer.removeChild(this.el.nativeElement, this.popoverCard);
      this.popoverCard = undefined;
    }
    this.renderer.removeClass(this.el.nativeElement, 'popover');
    this.visible = false;
  }
}
