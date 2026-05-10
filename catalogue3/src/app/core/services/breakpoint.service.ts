import { Injectable, signal } from '@angular/core';

export type Breakpoint = 'sm' | 'md' | 'lg';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  readonly current = signal<Breakpoint>('lg');
}
