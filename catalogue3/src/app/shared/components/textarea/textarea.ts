import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="field">
    <label *ngIf="label">{{ label }}</label>
    <textarea class="textarea" [placeholder]="placeholder" [value]="value" [disabled]="disabled"
      (input)="onInput($event)" (blur)="onTouched()"></textarea>
    <span class="helper" *ngIf="helper">{{ helper }}</span>
  </div>`,
  styles: `
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 12px; color: var(--ink-mute); font-weight: 500; }
    .textarea {
      font-family: var(--sans); font-size: 14px; color: var(--ink);
      padding: 12px 14px; min-height: 96px; resize: vertical;
      background: var(--glass-2); border: 1px solid var(--hairline); border-radius: var(--r-2);
      backdrop-filter: blur(20px);
      transition: border-color 120ms, box-shadow 120ms, background 120ms;
    }
    .textarea::placeholder { color: var(--ink-faint); }
    .textarea:focus { outline: none; border-color: color-mix(in oklab, var(--accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); background: var(--glass-3); }
    .textarea[disabled] { opacity: 0.5; cursor: not-allowed; }
    .helper { font-size: 12px; color: var(--ink-mute); }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() helper = '';
  @Input() disabled = false;

  value = '';
  private onChange: (v: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: string): void { this.value = v; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInput(e: Event): void {
    const v = (e.target as HTMLTextAreaElement).value;
    this.value = v;
    this.onChange(v);
  }

  onTouched(): void { this.onTouchedFn(); }
}
