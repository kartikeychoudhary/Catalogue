import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="field" [class.error]="state === 'error'" [class.success]="state === 'success'">
    <label *ngIf="label">{{ label }}</label>
    <input class="input" [type]="type" [placeholder]="placeholder" [value]="value" [disabled]="disabled"
      (input)="onInput($event)" (blur)="onTouched()" />
    <span class="helper" *ngIf="helper">{{ helper }}</span>
  </div>`,
  styles: `
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 12px; color: var(--ink-mute); font-weight: 500; }
    .input {
      font-family: var(--sans); font-size: 14px; color: var(--ink);
      padding: 12px 14px; min-height: 42px;
      background: var(--glass-2); border: 1px solid var(--hairline); border-radius: var(--r-2);
      backdrop-filter: blur(20px);
      transition: border-color 120ms, box-shadow 120ms, background 120ms;
    }
    .input::placeholder { color: var(--ink-faint); }
    .input:focus { outline: none; border-color: color-mix(in oklab, var(--accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); background: var(--glass-3); }
    .input[disabled] { opacity: 0.5; cursor: not-allowed; }
    .field.error .input { border-color: var(--danger); box-shadow: 0 0 0 3px color-mix(in oklab, var(--danger) 25%, transparent); }
    .field.error .helper { color: var(--danger); }
    .field.success .input { border-color: var(--success); }
    .helper { font-size: 12px; color: var(--ink-mute); }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() helper = '';
  @Input() state?: 'error' | 'success';
  @Input() disabled = false;

  value = '';
  private onChange: (v: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: string): void { this.value = v; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }

  onTouched(): void { this.onTouchedFn(); }
}
