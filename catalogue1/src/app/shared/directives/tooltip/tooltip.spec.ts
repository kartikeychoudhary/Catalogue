import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip-test',
  standalone: false,
  template: `<button [appTooltip]="tipText">Hover me</button>`,
})
class TestTooltipHostComponent {
  tipText = 'Tooltip text';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestTooltipHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestTooltipHostComponent, TooltipDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTooltipHostComponent);
  });

  it('shows tooltip on mouseenter', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tooltip = button.querySelector('.tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain('Tooltip text');
  });

  it('hides tooltip on mouseleave', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    button.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(button.querySelector('.tooltip')).toBeNull();
  });
});
