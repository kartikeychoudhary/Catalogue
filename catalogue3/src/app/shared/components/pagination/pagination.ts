import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="pager">
    <button (click)="pageChanged.emit(current - 1)" [disabled]="current <= 1">‹</button>
    <ng-container *ngFor="let p of pages">
      <span class="ellipsis" *ngIf="p === '...'">…</span>
      <button *ngIf="p !== '...'" [class.-active]="p === current"
        (click)="emitPage(p)">{{ p }}</button>
    </ng-container>
    <button (click)="pageChanged.emit(current + 1)" [disabled]="current >= total">›</button>
  </div>`,
  styles: `
    .pager { display: flex; gap: 4px; align-items: center; padding: 4px; background: var(--glass-2); border: 1px solid var(--hairline); border-radius: 999px; width: fit-content; }
    .pager button { width: 32px; height: 32px; border-radius: 999px; border: 0; background: transparent; color: var(--ink-soft); font-family: var(--mono); font-size: 12px; cursor: pointer; }
    .pager button.-active { background: var(--ink); color: var(--bg-deep); }
    .pager button:not(.-active):hover { background: var(--glass-strong); color: var(--ink); }
    .pager button:disabled { opacity: 0.3; cursor: not-allowed; }
    .pager .ellipsis { width: 16px; text-align: center; color: var(--ink-faint); }
  `,
})
export class PaginationComponent {
  @Input() current = 1;
  @Input() total = 10;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const result: (number | string)[] = [];
    for (let i = 1; i <= Math.min(this.total, 5); i++) result.push(i);
    if (this.total > 5) { result.push('...'); result.push(this.total); }
    return result;
  }

  emitPage(p: number | string): void {
    if (typeof p === 'number') {
      this.pageChanged.emit(p);
    }
  }
}
