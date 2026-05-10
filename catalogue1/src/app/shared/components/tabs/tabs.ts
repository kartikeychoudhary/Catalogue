import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface TabItem {
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = 0;

  @Output() tabChange = new EventEmitter<number>();
}
