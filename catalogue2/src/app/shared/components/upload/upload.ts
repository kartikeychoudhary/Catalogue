import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class UploadComponent {
  @Input() label = 'Upload file';
  @Input() accept?: string;

  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.fileSelected.emit(target.files[0]);
    }
  }
}
