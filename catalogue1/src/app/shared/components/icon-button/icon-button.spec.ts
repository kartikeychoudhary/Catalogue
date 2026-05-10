import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button';
import { IconRegistryService } from '@core/services/icon-registry.service';
import { SharedModule } from '@shared/index';

describe('IconButtonComponent', () => {
  let fixture: ComponentFixture<IconButtonComponent>;
  let component: IconButtonComponent;

  const mockRegistry = {
    resolve: (name: string) => `#icon-${name}`,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: IconRegistryService, useValue: mockRegistry },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button')!;
  }

  it('renders a button element', () => {
    fixture.detectChanges();
    expect(getButton()).toBeTruthy();
  });

  it('renders app-icon inside button', () => {
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('app-icon');
    expect(icon).toBeTruthy();
  });

  it('uses icon name as aria-label fallback', () => {
    component.icon = 'settings';
    component.ariaLabel = undefined;
    fixture.detectChanges();
    expect(getButton().getAttribute('aria-label')).toBe('settings');
  });

  it('uses explicit ariaLabel when provided', () => {
    component.ariaLabel = 'Go back';
    fixture.detectChanges();
    expect(getButton().getAttribute('aria-label')).toBe('Go back');
  });

  it('applies primary variant class', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    expect(getButton().classList.contains('icon-btn-primary')).toBe(true);
  });

  it('does not apply primary class for secondary variant', () => {
    fixture.detectChanges();
    expect(getButton().classList.contains('icon-btn-primary')).toBe(false);
  });

  it('applies sm size class', () => {
    component.size = 'sm';
    fixture.detectChanges();
    expect(getButton().classList.contains('icon-btn-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(getButton().classList.contains('icon-btn-lg')).toBe(true);
  });

  it('does not apply sm or lg class for md', () => {
    fixture.detectChanges();
    const btn = getButton();
    expect(btn.classList.contains('icon-btn-sm')).toBe(false);
    expect(btn.classList.contains('icon-btn-lg')).toBe(false);
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

  it('does not emit clicked when disabled', () => {
    let emitted = false;
    component.clicked.subscribe(() => { emitted = true; });
    component.disabled = true;
    fixture.detectChanges();
    getButton().click();
    expect(emitted).toBe(false);
  });

  it('defaults type to button', () => {
    fixture.detectChanges();
    expect(getButton().getAttribute('type')).toBe('button');
  });

  it('passes icon size 16 for sm', () => {
    component.size = 'sm';
    fixture.detectChanges();
    const iconEl = fixture.nativeElement.querySelector('app-icon svg')!;
    expect(iconEl.getAttribute('width')).toBe('16');
  });

  it('passes icon size 20 for md', () => {
    fixture.detectChanges();
    const iconEl = fixture.nativeElement.querySelector('app-icon svg')!;
    expect(iconEl.getAttribute('width')).toBe('20');
  });

  it('passes icon size 24 for lg', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const iconEl = fixture.nativeElement.querySelector('app-icon svg')!;
    expect(iconEl.getAttribute('width')).toBe('24');
  });
});
