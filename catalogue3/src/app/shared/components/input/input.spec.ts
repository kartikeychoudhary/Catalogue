import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';
import { Component } from '@angular/core';

@Component({ template: `<app-input label="Name" placeholder="Enter name"></app-input>`, standalone: false })
class TestHostComponent {}

describe('InputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders with label', () => {
    expect(fixture.nativeElement.textContent).toContain('Name');
  });
});
