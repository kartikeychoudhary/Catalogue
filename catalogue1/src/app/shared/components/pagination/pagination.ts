import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class PaginationComponent {
  @Input() current = 1;
  @Input() total = 0;

  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    if (this.total <= 7) {
      return Array.from({ length: this.total }, (_, i) => i + 1);
    }

    const result: (number | string)[] = [1];

    if (this.current > 3) {
      result.push('...');
    }

    const start = Math.max(2, this.current - 1);
    const end = Math.min(this.total - 1, this.current + 1);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    if (this.current < this.total - 2) {
      result.push('...');
    }

    result.push(this.total);

    return result;
  }

  goTo(page: number | string): void {
    if (typeof page === 'number') {
      this.current = page;
      this.pageChange.emit(page);
    }
  }

  prev(): void {
    if (this.current > 1) {
      this.current--;
      this.pageChange.emit(this.current);
    }
  }

  next(): void {
    if (this.current < this.total) {
      this.current++;
      this.pageChange.emit(this.current);
    }
  }
}
