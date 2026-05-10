import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider';
import { SharedModule } from '@shared/index';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;
  let component: SliderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="range"]')!;
  }

  function getHelper(): HTMLSpanElement {
    return fixture.nativeElement.querySelector('.helper')!;
  }

  it('renders a range input', () => {
    fixture.detectChanges();
    expect(getInput()).toBeTruthy();
  });

  it('defaults min to 0, max to 100, value to 50', () => {
    fixture.detectChanges();
    const input = getInput();
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.value).toBe('50');
  });

  it('respects min/max/value inputs', () => {
    component.min = 10;
    component.max = 200;
    component.value = 75;
    fixture.detectChanges();
    const input = getInput();
    expect(input.min).toBe('10');
    expect(input.max).toBe('200');
    expect(input.value).toBe('75');
  });

  it('renders label when provided', () => {
    component.label = 'Volume';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
    expect(label!.textContent).toContain('Volume');
  });

  it('does not render label when empty', () => {
    component.label = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label')).toBeNull();
  });

  it('shows current value in helper', () => {
    component.value = 42;
    fixture.detectChanges();
    expect(getHelper().textContent).toContain('42');
  });

  it('emits valueChange on input', () => {
    let emittedValue: number | undefined;
    component.valueChange.subscribe((val: number) => {
      emittedValue = val;
    });

    fixture.detectChanges();
    const input = getInput();
    input.value = '60';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emittedValue).toBe(60);
    expect(component.value).toBe(60);
  });

  it('sets aria-label on input', () => {
    component.label = 'Brightness';
    fixture.detectChanges();
    expect(getInput().getAttribute('aria-label')).toBe('Brightness');
  });
});
