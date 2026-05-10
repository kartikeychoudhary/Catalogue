import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-feedback-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.scss',
})
export class FeedbackSectionComponent {
  private toastService = inject(ToastService);

  showToast(): void {
    this.toastService.show('Item saved successfully', {
      variant: 'success',
      actionLabel: 'Undo',
    });
  }
}
