import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select';
import { SharedModule } from '@shared/index';

describe('SelectComponent', () => {
  let fixture: ComponentFixture<SelectComponent>;
  let component: SelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  function getSelect(): HTMLSelectElement {
    return fixture.nativeElement.querySelector('select')!;
  }

  function getOptions(): HTMLOptionElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('option'));
  }

  it('renders a select element', () => {
    fixture.detectChanges();
    expect(getSelect()).toBeTruthy();
  });

  it('renders options from input', () => {
    component.options = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ];
    fixture.detectChanges();
    const options = getOptions();
    expect(options.length).toBe(2);
    expect(options[0].textContent).toContain('Option A');
    expect(options[0].value).toBe('a');
    expect(options[1].textContent).toContain('Option B');
    expect(options[1].value).toBe('b');
  });

  it('renders no options when empty', () => {
    component.options = [];
    fixture.detectChanges();
    expect(getOptions().length).toBe(0);
  });

  it('selects value', () => {
    component.options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    component.value = 'b';
    fixture.detectChanges();
    const select = getSelect();
    expect(select.value).toBe('b');
  });

  it('supports multiple attribute', () => {
    component.multiple = true;
    fixture.detectChanges();
    expect(getSelect().hasAttribute('multiple')).toBe(true);
  });

  it('supports size attribute', () => {
    component.size = 4;
    fixture.detectChanges();
    expect(getSelect().getAttribute('size')).toBe('4');
  });

  it('does not set size when undefined', () => {
    component.size = undefined;
    fixture.detectChanges();
    expect(getSelect().hasAttribute('size')).toBe(false);
  });

  it('renders label when provided', () => {
    component.label = 'Choose';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
    expect(label!.textContent).toContain('Choose');
  });

  it('sets disabled attribute when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(getSelect().hasAttribute('disabled')).toBe(true);
  });
});
