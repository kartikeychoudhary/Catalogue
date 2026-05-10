import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';
import { Component } from '@angular/core';

@Component({ template: `<app-button variant="primary">Click</app-button>`, standalone: false })
class TestHostComponent {}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders with text', () => {
    expect(fixture.nativeElement.textContent).toContain('Click');
  });
});
