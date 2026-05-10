import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox';
import { SharedModule } from '@shared/index';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="checkbox"]')!;
  }

  function getLabel(): HTMLLabelElement {
    return fixture.nativeElement.querySelector('.check')!;
  }

  it('renders a checkbox input', () => {
    fixture.detectChanges();
    expect(getInput()).toBeTruthy();
  });

  it('renders label text', () => {
    component.label = 'Accept terms';
    fixture.detectChanges();
    expect(getLabel().textContent).toContain('Accept terms');
  });

  it('sets checked state', () => {
    component.checked = true;
    fixture.detectChanges();
    expect(getInput().checked).toBe(true);
  });

  it('defaults to unchecked', () => {
    fixture.detectChanges();
    expect(getInput().checked).toBe(false);
  });

  it('sets name attribute', () => {
    component.name = 'terms';
    fixture.detectChanges();
    expect(getInput().getAttribute('name')).toBe('terms');
  });

  it('toggles checked on click and emits checkedChange', () => {
    let emittedValue: boolean | undefined;
    component.checkedChange.subscribe((val: boolean) => {
      emittedValue = val;
    });

    fixture.detectChanges();
    getInput().click();
    fixture.detectChanges();

    expect(component.checked).toBe(true);
    expect(emittedValue).toBe(true);
  });

  it('toggles from checked to unchecked', () => {
    component.checked = true;
    fixture.detectChanges();
    getInput().click();
    fixture.detectChanges();

    expect(component.checked).toBe(false);
  });

  it('has accessible label association', () => {
    component.label = 'Subscribe';
    fixture.detectChanges();
    const label = getLabel();
    const input = getInput();
    expect(label.contains(input)).toBe(true);
  });
});
