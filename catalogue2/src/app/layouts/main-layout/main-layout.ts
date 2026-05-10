import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent {}
