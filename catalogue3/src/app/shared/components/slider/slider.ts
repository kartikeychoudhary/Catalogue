import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="field">
    <label *ngIf="label">{{ label }}</label>
    <input class="slider" type="range" [min]="min" [max]="max" [value]="value" [disabled]="disabled"
      (input)="onInput($event)" />
    <span class="helper" *ngIf="helper">{{ helper }}</span>
  </div>`,
  styles: `
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 12px; color: var(--ink-mute); font-weight: 500; }
    .slider { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; background: var(--glass-3); border-radius: 999px; }
    .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 1px solid var(--hairline-bold); box-shadow: 0 4px 12px rgba(0,0,0,0.4); cursor: pointer; }
    .slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: white; border: 1px solid var(--hairline-bold); cursor: pointer; }
    .helper { font-size: 12px; color: var(--ink-mute); }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderComponent), multi: true }],
})
export class SliderComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() helper = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() disabled = false;
  @Input() value = 50;

  private onChange: (v: number) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: number): void { this.value = v; }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInput(e: Event): void {
    const v = +(e.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }
}
