import { Injectable, signal, computed, OnDestroy, effect } from '@angular/core';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

@Injectable({ providedIn: 'root' })
export class BreakpointService implements OnDestroy {
  private win = window;

  private mql768 = this.win.matchMedia('(min-width: 768px)');
  private mql1024 = this.win.matchMedia('(min-width: 1024px)');

  current = signal<Breakpoint>(this.compute());

  isMobile = computed(() => this.current() === 'mobile');
  isTablet = computed(() => this.current() === 'tablet');
  isDesktop = computed(() => this.current() === 'desktop');

  private handler = () => this.current.set(this.compute());

  constructor() {
    this.mql768.addEventListener('change', this.handler);
    this.mql1024.addEventListener('change', this.handler);
  }

  ngOnDestroy(): void {
    this.mql768.removeEventListener('change', this.handler);
    this.mql1024.removeEventListener('change', this.handler);
  }

  private compute(): Breakpoint {
    if (this.mql1024.matches) return 'desktop';
    if (this.mql768.matches) return 'tablet';
    return 'mobile';
  }
}
