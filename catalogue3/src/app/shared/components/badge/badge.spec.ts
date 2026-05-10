import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';
import { Component } from '@angular/core';

@Component({ template: `<app-badge variant="success">Live</app-badge>`, standalone: false })
class TestHostComponent {}

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders with text', () => {
    expect(fixture.nativeElement.textContent).toContain('Live');
  });
});
