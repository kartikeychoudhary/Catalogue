import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="modal-stage" *ngIf="open" (click)="backdropClicked.emit()">
    <div class="modal" (click)="$event.stopPropagation()">
      <ng-content></ng-content>
    </div>
  </div>`,
  styles: `
    .modal-stage { padding: 24px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); position: relative; min-height: 280px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .modal-stage::before { content:""; position: absolute; inset: 0; backdrop-filter: blur(40px); background: rgba(0,0,0,0.2); }
    .modal { position: relative; max-width: 420px; padding: 24px; border-radius: var(--r-4); background: var(--glass-3); border: 1px solid var(--hairline-bold); box-shadow: var(--shadow-2); z-index: 1; }
  `,
})
export class ModalComponent {
  @Input() open = false;
  @Output() backdropClicked = new EventEmitter<void>();
}
