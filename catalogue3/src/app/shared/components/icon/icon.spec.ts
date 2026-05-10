import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon';
import { Component } from '@angular/core';

@Component({ template: `<app-icon name="play" size="lg"></app-icon>`, standalone: false })
class TestHostComponent {}

describe('IconComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders an svg', () => {
    const el = fixture.nativeElement.querySelector('svg');
    expect(el).toBeTruthy();
  });
});
