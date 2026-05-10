import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert';
import { SharedModule } from '@shared/index';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('renders alert with info variant by default', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.alert');
    expect(el).toBeTruthy();
    expect(el.classList.contains('-info')).toBe(true);
  });

  it('applies success variant border', () => {
    component.variant = 'success';
    component.title = 'OK';
    component.message = 'Msg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').classList.contains('-success')).toBe(true);
  });

  it('applies warning variant border', () => {
    component.variant = 'warning';
    component.title = 'Warn';
    component.message = 'Msg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').classList.contains('-warning')).toBe(true);
  });

  it('applies danger variant border', () => {
    component.variant = 'danger';
    component.title = 'Err';
    component.message = 'Msg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').classList.contains('-danger')).toBe(true);
  });

  it('renders title and message', () => {
    component.title = 'My Title';
    component.message = 'My Message';
    fixture.detectChanges();
    const h6 = fixture.nativeElement.querySelector('h6');
    const p = fixture.nativeElement.querySelector('p');
    expect(h6.textContent).toBe('My Title');
    expect(p.textContent).toBe('My Message');
  });

  it('does not show action button when actionLabel is not set', () => {
    component.title = 'T';
    component.message = 'M';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-action')).toBeNull();
  });

  it('shows action button when actionLabel is set', () => {
    component.title = 'T';
    component.message = 'M';
    component.actionLabel = 'Retry';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.alert-action');
    expect(btn).toBeTruthy();
    expect(btn.textContent.trim()).toBe('Retry');
  });

  it('emits actionClick when action button is clicked', () => {
    component.title = 'T';
    component.message = 'M';
    component.actionLabel = 'Retry';
    fixture.detectChanges();
    let emitted = false;
    component.actionClick.subscribe(() => (emitted = true));
    fixture.nativeElement.querySelector('.alert-action').click();
    expect(emitted).toBe(true);
  });

  it('has role alert for accessibility', () => {
    component.title = 'T';
    component.message = 'M';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').getAttribute('role')).toBe('alert');
  });
});
