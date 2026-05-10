import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<fieldset style="border:0;padding:0;margin:0;">
    <legend *ngIf="label" style="font-size:12px;color:var(--ink-mute);margin-bottom:6px;">{{ label }}</legend>
    <div [style.display]="inline ? 'flex' : 'block'" [style.gap.px]="inline ? 18 : 0" [style.flexWrap]="inline ? 'wrap' : 'nowrap'">
      <label class="radio" *ngFor="let opt of options" [style.display]="'inline-flex'" [style.marginBottom.px]="inline ? 0 : 8">
        <input type="radio" [name]="name" [value]="opt.value" [checked]="value === opt.value"
          (change)="select(opt.value)" [disabled]="disabled" />
        {{ opt.label }}
      </label>
    </div>
  </fieldset>`,
  styles: `
    .radio { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; }
    .radio input {
      appearance: none; width: 20px; height: 20px;
      background: var(--glass-2); border: 1px solid var(--hairline-bold); cursor: pointer; position: relative;
      border-radius: 50%;
    }
    .radio input:checked { background: linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 60%, var(--accent-2))); border-color: transparent; }
    .radio input:checked::after { content: ""; position: absolute; inset: 5px; background: white; border-radius: 50%; }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true }],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() name = 'radio-group';
  @Input() options: { label: string; value: string }[] = [];
  @Input() inline = true;
  @Input() disabled = false;

  value = '';
  private onChange: (v: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: string): void { this.value = v; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  select(v: string): void {
    this.value = v;
    this.onChange(v);
    this.onTouchedFn();
  }
}
