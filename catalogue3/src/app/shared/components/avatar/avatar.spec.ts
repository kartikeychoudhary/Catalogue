import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar';
import { Component } from '@angular/core';

@Component({ template: `<app-avatar initials="MO" size="lg"></app-avatar>`, standalone: false })
class TestHostComponent {}

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders initials', () => {
    expect(fixture.nativeElement.textContent).toContain('MO');
  });
});
