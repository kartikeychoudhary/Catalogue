import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button';

describe('IconButtonComponent', () => {
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(IconButtonComponent);
    fixture.detectChanges();
  });

  it('renders button', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });
});
