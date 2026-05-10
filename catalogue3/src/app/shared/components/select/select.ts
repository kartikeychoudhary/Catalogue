import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="field">
    <label *ngIf="label">{{ label }}</label>
    <select class="select" [value]="value" [disabled]="disabled" [multiple]="multiple"
      (change)="onChange($event)" (blur)="onTouched()">
      <option *ngFor="let opt of options" [value]="opt.value" [selected]="opt.selected">{{ opt.label }}</option>
    </select>
    <span class="helper" *ngIf="helper">{{ helper }}</span>
  </div>`,
  styles: `
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 12px; color: var(--ink-mute); font-weight: 500; }
    .select {
      font-family: var(--sans); font-size: 14px; color: var(--ink);
      padding: 12px 14px; min-height: 42px;
      background: var(--glass-2); border: 1px solid var(--hairline); border-radius: var(--r-2);
      backdrop-filter: blur(20px);
      transition: border-color 120ms, box-shadow 120ms, background 120ms;
    }
    .select:focus { outline: none; border-color: color-mix(in oklab, var(--accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); background: var(--glass-3); }
    .helper { font-size: 12px; color: var(--ink-mute); }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() helper = '';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() options: { label: string; value: string; selected?: boolean }[] = [];

  value = '';
  private onChangeFn: (v: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: string): void { this.value = v; }
  registerOnChange(fn: (v: string) => void): void { this.onChangeFn = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onChange(e: Event): void {
    const v = (e.target as HTMLSelectElement).value;
    this.value = v;
    this.onChangeFn(v);
  }

  onTouched(): void { this.onTouchedFn(); }
}
