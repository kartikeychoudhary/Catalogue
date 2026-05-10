import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from './tag';
import { Component } from '@angular/core';

@Component({ template: `<app-tag [glow]="true">member</app-tag>`, standalone: false })
class TestHostComponent {}

describe('TagComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagComponent, TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders with text', () => {
    expect(fixture.nativeElement.textContent).toContain('member');
  });
});
