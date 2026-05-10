import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea';
import { SharedModule } from '@shared/index';

describe('TextareaComponent', () => {
  let fixture: ComponentFixture<TextareaComponent>;
  let component: TextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
  });

  function getTextarea(): HTMLTextAreaElement {
    return fixture.nativeElement.querySelector('textarea')!;
  }

  function getLabel(): HTMLLabelElement | null {
    return fixture.nativeElement.querySelector('label');
  }

  it('renders a textarea element', () => {
    fixture.detectChanges();
    expect(getTextarea()).toBeTruthy();
  });

  it('renders label when provided', () => {
    component.label = 'Message';
    fixture.detectChanges();
    const label = getLabel();
    expect(label).toBeTruthy();
    expect(label!.textContent).toContain('Message');
  });

  it('does not render label when empty', () => {
    component.label = '';
    fixture.detectChanges();
    expect(getLabel()).toBeNull();
  });

  it('uses rows attribute with default value 4', () => {
    fixture.detectChanges();
    expect(getTextarea().getAttribute('rows')).toBe('4');
  });

  it('respects rows input', () => {
    component.rows = 6;
    fixture.detectChanges();
    expect(getTextarea().getAttribute('rows')).toBe('6');
  });

  it('sets disabled attribute when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(getTextarea().hasAttribute('disabled')).toBe(true);
  });

  it('shows placeholder text', () => {
    component.placeholder = 'Enter message...';
    fixture.detectChanges();
    expect(getTextarea().getAttribute('placeholder')).toBe('Enter message...');
  });

  it('sets aria-label from label', () => {
    component.label = 'Message';
    fixture.detectChanges();
    expect(getTextarea().getAttribute('aria-label')).toBe('Message');
  });

  it('sets value', () => {
    component.value = 'Hello world';
    fixture.detectChanges();
    expect(getTextarea().value).toBe('Hello world');
  });
});
