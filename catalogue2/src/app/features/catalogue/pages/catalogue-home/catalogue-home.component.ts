import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-catalogue-home',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalogue-home.component.html',
  styleUrl: './catalogue-home.component.scss',
})
export class CatalogueHomeComponent {}
