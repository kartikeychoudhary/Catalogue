import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastOptions {
  actionLabel?: string;
  variant?: 'default' | 'success';
  showDot?: boolean;
}

export interface ToastState {
  message: string;
  actionLabel?: string;
  variant: 'default' | 'success';
  showDot: boolean;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly store = new BehaviorSubject<ToastState>({
    message: '',
    variant: 'default',
    showDot: true,
    visible: false,
  });

  readonly toast$: Observable<ToastState> = this.store.asObservable();

  show(message: string, options?: ToastOptions): void {
    this.store.next({
      message,
      variant: options?.variant ?? 'default',
      actionLabel: options?.actionLabel,
      showDot: options?.showDot ?? true,
      visible: true,
    });
  }

  dismiss(): void {
    this.store.next({
      message: '',
      variant: 'default',
      showDot: true,
      visible: false,
    });
  }
}
