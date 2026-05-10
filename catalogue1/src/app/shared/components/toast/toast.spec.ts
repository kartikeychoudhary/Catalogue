import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ToastComponent } from './toast';
import { ToastService } from './toast.service';
import { SharedModule } from '@shared/index';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('renders message', () => {
    component.message = 'Hello toast';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast-message').textContent).toBe('Hello toast');
  });

  it('shows dot by default', () => {
    component.message = 'Hi';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast-dot')).toBeTruthy();
  });

  it('hides dot when showDot is false', () => {
    component.message = 'Hi';
    component.showDot = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast-dot')).toBeNull();
  });

  it('shows action button when actionLabel is set', () => {
    component.message = 'Hi';
    component.actionLabel = 'Undo';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.toast-action');
    expect(btn).toBeTruthy();
    expect(btn.textContent.trim()).toBe('Undo');
  });

  it('does not show action button when actionLabel is not set', () => {
    component.message = 'Hi';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast-action')).toBeNull();
  });

  it('emits dismiss when dismiss button clicked', () => {
    component.message = 'Hi';
    fixture.detectChanges();
    let dismissed = false;
    component.dismiss.subscribe(() => (dismissed = true));
    fixture.nativeElement.querySelector('.toast-dismiss').click();
    expect(dismissed).toBe(true);
  });

  it('emits actionClick when action button clicked', () => {
    component.message = 'Hi';
    component.actionLabel = 'Undo';
    fixture.detectChanges();
    let clicked = false;
    component.actionClick.subscribe(() => (clicked = true));
    fixture.nativeElement.querySelector('.toast-action').click();
    expect(clicked).toBe(true);
  });

  it('applies success variant class', () => {
    component.message = 'Hi';
    component.variant = 'success';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast').classList.contains('-success')).toBe(true);
  });

  it('has role status for accessibility', () => {
    component.message = 'Hi';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast').getAttribute('role')).toBe('status');
  });
});

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('starts with invisible toast', async () => {
    const state = await firstValueFrom(service.toast$);
    expect(state.visible).toBe(false);
  });

  it('shows a toast with message', async () => {
    service.show('Hello!');
    const state = await firstValueFrom(service.toast$);
    expect(state.visible).toBe(true);
    expect(state.message).toBe('Hello!');
  });

  it('dismisses the toast', async () => {
    service.show('Hello!');
    service.dismiss();
    const state = await firstValueFrom(service.toast$);
    expect(state.visible).toBe(false);
  });

  it('accepts options', async () => {
    service.show('Saved', { variant: 'success', actionLabel: 'Undo' });
    const state = await firstValueFrom(service.toast$);
    expect(state.variant).toBe('success');
    expect(state.actionLabel).toBe('Undo');
  });
});
