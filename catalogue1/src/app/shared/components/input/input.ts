import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type InputType = 'text' | 'email' | 'password' | 'date' | 'time';
type InputState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() state: InputState = 'default';
  @Input() helper = '';
}
