import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton';
import { SharedModule } from '@shared/index';

describe('SkeletonComponent', () => {
  let fixture: ComponentFixture<SkeletonComponent>;
  let component: SkeletonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
  });

  it('renders skeleton div', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skel')).toBeTruthy();
  });

  it('defaults to text variant', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skel').classList.contains('-text')).toBe(true);
  });

  it('applies tall variant class', () => {
    component.variant = 'tall';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skel').classList.contains('-tall')).toBe(true);
  });

  it('applies img variant class', () => {
    component.variant = 'img';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skel').classList.contains('-img')).toBe(true);
  });

  it('applies custom width', () => {
    component.width = '200px';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skel').style.width).toBe('200px');
  });

  it('is hidden from assistive technology', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.skel');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.getAttribute('role')).toBe('presentation');
  });
});
