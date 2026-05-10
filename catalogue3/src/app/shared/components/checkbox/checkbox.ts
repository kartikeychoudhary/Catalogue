import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<label class="check">
    <input type="checkbox" [checked]="checked" [disabled]="disabled" (change)="toggle()" />
    <ng-content></ng-content>
  </label>`,
  styles: `
    .check { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; }
    .check input {
      appearance: none; width: 20px; height: 20px;
      background: var(--glass-2); border: 1px solid var(--hairline-bold); cursor: pointer; position: relative;
      border-radius: 6px;
    }
    .check input:checked { background: linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 60%, var(--accent-2))); border-color: transparent; }
    .check input:checked::after { content: "✓"; position: absolute; inset: 0; display: grid; place-items: center; color: white; font-size: 13px; font-weight: 700; }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() checked = false;

  private onChange: (v: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: boolean): void { this.checked = v; }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  toggle(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouchedFn();
  }
}
