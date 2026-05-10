import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle';
import { SharedModule } from '@shared/index';

describe('ToggleComponent', () => {
  let fixture: ComponentFixture<ToggleComponent>;
  let component: ToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="checkbox"]')!;
  }

  function getLabel(): HTMLLabelElement {
    return fixture.nativeElement.querySelector('.toggle')!;
  }

  it('renders a toggle checkbox', () => {
    fixture.detectChanges();
    expect(getInput()).toBeTruthy();
  });

  it('renders label text', () => {
    component.label = 'Enable notifications';
    fixture.detectChanges();
    expect(getLabel().textContent).toContain('Enable notifications');
  });

  it('defaults to unchecked', () => {
    fixture.detectChanges();
    expect(getInput().checked).toBe(false);
  });

  it('sets checked state', () => {
    component.checked = true;
    fixture.detectChanges();
    expect(getInput().checked).toBe(true);
  });

  it('toggles on click and emits checkedChange', () => {
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
    component.label = 'Dark mode';
    fixture.detectChanges();
    const label = getLabel();
    const input = getInput();
    expect(label.contains(input)).toBe(true);
  });
});
