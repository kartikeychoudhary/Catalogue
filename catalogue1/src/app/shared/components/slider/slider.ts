import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class SliderComponent {
  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 50;
  @Input() helper = '';

  @Output() valueChange = new EventEmitter<number>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = Number(target.value);
    this.value = val;
    this.valueChange.emit(val);
  }
}
