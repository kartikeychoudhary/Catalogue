import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent implements OnChanges {
  @Input() open = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      setTimeout(() => this.focusFirst());
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close.emit();
    }
  }

  onStageClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-stage')) {
      this.close.emit();
    }
  }

  private focusFirst(): void {
    const focusable = this.el.nativeElement.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }
}
