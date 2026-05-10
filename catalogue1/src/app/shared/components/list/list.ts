import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent {}
