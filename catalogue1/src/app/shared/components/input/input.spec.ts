import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';
import { SharedModule } from '@shared/index';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input')!;
  }

  function getLabel(): HTMLLabelElement | null {
    return fixture.nativeElement.querySelector('label');
  }

  function getHelper(): HTMLSpanElement | null {
    return fixture.nativeElement.querySelector('.helper');
  }

  it('renders an input element', () => {
    fixture.detectChanges();
    expect(getInput()).toBeTruthy();
  });

  it('renders label when provided', () => {
    component.label = 'Email';
    fixture.detectChanges();
    const label = getLabel();
    expect(label).toBeTruthy();
    expect(label!.textContent).toContain('Email');
  });

  it('does not render label when empty', () => {
    component.label = '';
    fixture.detectChanges();
    expect(getLabel()).toBeNull();
  });

  it('renders helper text when provided', () => {
    component.helper = 'Required field';
    fixture.detectChanges();
    const helper = getHelper();
    expect(helper).toBeTruthy();
    expect(helper!.textContent).toContain('Required field');
  });

  it('does not render helper when empty', () => {
    component.helper = '';
    fixture.detectChanges();
    expect(getHelper()).toBeNull();
  });

  it('applies error class when state is error', () => {
    component.state = 'error';
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.field');
    expect(field.classList.contains('error')).toBe(true);
  });

  it('applies success class when state is success', () => {
    component.state = 'success';
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.field');
    expect(field.classList.contains('success')).toBe(true);
  });

  it('does not apply error or success class by default', () => {
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.field');
    expect(field.classList.contains('error')).toBe(false);
    expect(field.classList.contains('success')).toBe(false);
  });

  it('sets disabled attribute when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(getInput().hasAttribute('disabled')).toBe(true);
  });

  it('applies type attribute', () => {
    component.type = 'email';
    fixture.detectChanges();
    expect(getInput().getAttribute('type')).toBe('email');
  });

  it('defaults type to text', () => {
    fixture.detectChanges();
    expect(getInput().getAttribute('type')).toBe('text');
  });

  it('shows placeholder text', () => {
    component.placeholder = 'Enter your email';
    fixture.detectChanges();
    expect(getInput().getAttribute('placeholder')).toBe('Enter your email');
  });

  it('sets aria-label from label', () => {
    component.label = 'Email';
    fixture.detectChanges();
    expect(getInput().getAttribute('aria-label')).toBe('Email');
  });

  it('sets aria-label from placeholder when no label', () => {
    component.placeholder = 'Search...';
    fixture.detectChanges();
    expect(getInput().getAttribute('aria-label')).toBe('Search...');
  });

  it('sets value input', () => {
    component.value = 'test@example.com';
    fixture.detectChanges();
    expect(getInput().value).toBe('test@example.com');
  });
});
