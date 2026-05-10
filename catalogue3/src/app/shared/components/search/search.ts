import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="search">
    <input class="input" type="text" [placeholder]="placeholder" [value]="value" [disabled]="disabled"
      (input)="onInput($event)" (blur)="onTouched()" />
  </div>`,
  styles: `
    .search { position: relative; }
    .search .input {
      font-family: var(--sans); font-size: 14px; color: var(--ink);
      padding: 12px 14px 12px 40px; min-height: 42px; width: 100%;
      background: var(--glass-2); border: 1px solid var(--hairline); border-radius: var(--r-2);
      backdrop-filter: blur(20px);
      transition: border-color 120ms, box-shadow 120ms;
    }
    .search::before { content: "⌕"; position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-mute); font-family: var(--mono); }
    .search .input::placeholder { color: var(--ink-faint); }
    .search .input:focus { outline: none; border-color: color-mix(in oklab, var(--accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); background: var(--glass-3); }
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchComponent), multi: true }],
})
export class SearchComponent implements ControlValueAccessor {
  @Input() placeholder = 'Search...';
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
