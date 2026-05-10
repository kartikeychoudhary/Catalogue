import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group';
import { SharedModule } from '@shared/index';

describe('RadioGroupComponent', () => {
  let fixture: ComponentFixture<RadioGroupComponent>;
  let component: RadioGroupComponent;

  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    component.options = options;
    component.name = 'test-group';
  });

  function getRadios(): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('input[type="radio"]'));
  }

  function getLabels(): HTMLLabelElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.radio'));
  }

  it('renders all options', () => {
    fixture.detectChanges();
    expect(getRadios().length).toBe(3);
    expect(getLabels().length).toBe(3);
  });

  it('renders option labels', () => {
    fixture.detectChanges();
    const labels = getLabels();
    expect(labels[0].textContent).toContain('Option A');
    expect(labels[1].textContent).toContain('Option B');
    expect(labels[2].textContent).toContain('Option C');
  });

  it('sets name on all radio inputs', () => {
    fixture.detectChanges();
    getRadios().forEach((radio) => {
      expect(radio.getAttribute('name')).toBe('test-group');
    });
  });

  it('selects correct value', () => {
    component.value = 'b';
    fixture.detectChanges();
    const radios = getRadios();
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
    expect(radios[2].checked).toBe(false);
  });

  it('emits valueChange on selection', () => {
    let emittedValue: string | undefined;
    component.valueChange.subscribe((val: string) => {
      emittedValue = val;
    });

    fixture.detectChanges();
    const radios = getRadios();
    radios[2].click();
    fixture.detectChanges();

    expect(emittedValue).toBe('c');
  });

  it('renders no radios when options empty', () => {
    component.options = [];
    fixture.detectChanges();
    expect(getRadios().length).toBe(0);
  });

  it('has accessible label for each radio', () => {
    component.value = 'a';
    fixture.detectChanges();
    const labels = getLabels();
    const radios = getRadios();
    labels.forEach((label, i) => {
      expect(label.contains(radios[i])).toBe(true);
    });
  });
});
