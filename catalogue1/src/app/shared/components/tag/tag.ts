import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class TagComponent {}
