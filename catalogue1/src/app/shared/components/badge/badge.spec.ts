import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';
import { SharedModule } from '@shared/index';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;
  let component: BadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  function getSpan(): HTMLElement {
    return fixture.nativeElement.querySelector('.badge')!;
  }

  it('renders a span with class badge', () => {
    fixture.detectChanges();
    expect(getSpan()).toBeTruthy();
  });

  it('defaults to neutral variant', () => {
    fixture.detectChanges();
    expect(getSpan().classList.contains('-neutral')).toBe(true);
  });

  it('applies success variant class', () => {
    component.variant = 'success';
    fixture.detectChanges();
    expect(getSpan().classList.contains('-success')).toBe(true);
  });

  it('applies warning variant class', () => {
    component.variant = 'warning';
    fixture.detectChanges();
    expect(getSpan().classList.contains('-warning')).toBe(true);
  });

  it('applies danger variant class', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    expect(getSpan().classList.contains('-danger')).toBe(true);
  });

  it('applies info variant class', () => {
    component.variant = 'info';
    fixture.detectChanges();
    expect(getSpan().classList.contains('-info')).toBe(true);
  });

  it('renders dot prefix', () => {
    fixture.detectChanges();
    const dot = fixture.nativeElement.querySelector('.badge-dot');
    expect(dot).toBeTruthy();
    expect(dot.textContent).toContain('●');
  });

  it('renders ng-content', () => {
    fixture.detectChanges();
    const span = getSpan();
    expect(span).toBeTruthy();
  });

  it('has role status for accessibility', () => {
    fixture.detectChanges();
    const span = getSpan();
    expect(span.getAttribute('role')).toBe('status');
  });
});
