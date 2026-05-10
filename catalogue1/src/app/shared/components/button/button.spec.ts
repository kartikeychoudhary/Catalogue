import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';
import { SharedModule } from '@shared/index';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button')!;
  }

  it('renders a button element', () => {
    fixture.detectChanges();
    expect(getButton()).toBeTruthy();
  });

  it('applies primary variant class by default', () => {
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-primary')).toBe(true);
  });

  it('applies secondary variant class', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-secondary')).toBe(true);
  });

  it('applies tertiary variant class', () => {
    component.variant = 'tertiary';
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-tertiary')).toBe(true);
  });

  it('applies destructive variant class', () => {
    component.variant = 'destructive';
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-destructive')).toBe(true);
  });

  it('applies sm size class', () => {
    component.size = 'sm';
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(getButton().classList.contains('btn-lg')).toBe(true);
  });

  it('does not apply sm or lg class for md size', () => {
    fixture.detectChanges();
    const btn = getButton();
    expect(btn.classList.contains('btn-sm')).toBe(false);
    expect(btn.classList.contains('btn-lg')).toBe(false);
  });

  it('emits clicked event on click', () => {
    let emitted = false;
    component.clicked.subscribe(() => { emitted = true; });
    fixture.detectChanges();
    getButton().click();
    expect(emitted).toBe(true);
  });

  it('sets disabled attribute when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(getButton().hasAttribute('disabled')).toBe(true);
  });

  it('sets disabled attribute when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(getButton().hasAttribute('disabled')).toBe(true);
  });

  it('applies loading class when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(getButton().classList.contains('-loading')).toBe(true);
  });

  it('does not emit clicked when disabled', () => {
    let emitted = false;
    component.clicked.subscribe(() => { emitted = true; });
    component.disabled = true;
    fixture.detectChanges();
    getButton().click();
    expect(emitted).toBe(false);
  });

  it('sets aria-label when provided', () => {
    component.ariaLabel = 'Submit form';
    fixture.detectChanges();
    expect(getButton().getAttribute('aria-label')).toBe('Submit form');
  });

  it('defaults type to button', () => {
    fixture.detectChanges();
    expect(getButton().getAttribute('type')).toBe('button');
  });

  it('respects type input', () => {
    component.type = 'submit';
    fixture.detectChanges();
    expect(getButton().getAttribute('type')).toBe('submit');
  });
});
