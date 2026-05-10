import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PopoverDirective } from './popover.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover-test',
  standalone: false,
  template: `<button [appPopover]="content" [popoverTitle]="title">Click me</button>`,
})
class TestPopoverHostComponent {
  content = 'Popover content';
  title = 'Pop Title';
}

describe('PopoverDirective', () => {
  let fixture: ComponentFixture<TestPopoverHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestPopoverHostComponent, PopoverDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPopoverHostComponent);
  });

  it('toggles popover on click', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const card = button.querySelector('.popover-card');
    expect(card).toBeTruthy();
    expect(card.querySelector('p').textContent).toBe('Popover content');
    expect(card.querySelector('h6').textContent).toBe('Pop Title');
  });

  it('hides popover on second click', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();
    expect(button.querySelector('.popover-card')).toBeNull();
  });

  it('hides popover on document click', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(button.querySelector('.popover-card')).toBeNull();
  });
});
