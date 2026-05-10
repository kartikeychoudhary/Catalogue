import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class TextareaComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() rows = 4;
}
