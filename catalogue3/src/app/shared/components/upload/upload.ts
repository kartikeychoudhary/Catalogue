import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="upload" (click)="fileInput.click()">
    <input type="file" #fileInput hidden (change)="onFileSelected($event)" />
    <ng-content></ng-content>
  </div>`,
  styles: `
    .upload { border: 1px dashed var(--hairline-bold); background: var(--glass-1); padding: 24px; text-align: center; border-radius: var(--r-3); cursor: pointer; }
    .upload:hover { background: var(--glass-2); }
  `,
})
export class UploadComponent {
  @Input() accept = '*';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      // handled by consumers via event
    }
  }
}
