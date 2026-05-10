import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress';
import { SharedModule } from '@shared/index';

describe('ProgressComponent', () => {
  let fixture: ComponentFixture<ProgressComponent>;
  let component: ProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
  });

  it('renders progress bar', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress')).toBeTruthy();
  });

  it('calculates correct width percentage', () => {
    component.value = 50;
    component.max = 100;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.progress span');
    expect(span.style.width).toBe('50%');
  });

  it('clamps percentage to max 100', () => {
    component.value = 200;
    component.max = 100;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.progress span');
    expect(span.style.width).toBe('100%');
  });

  it('shows label when provided', () => {
    component.label = 'Uploading...';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.progress-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Uploading...');
  });

  it('does not show label when not provided', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress-label')).toBeNull();
  });

  it('has progressbar role', () => {
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.progress-wrapper');
    expect(wrapper.getAttribute('role')).toBe('progressbar');
  });

  it('sets aria-valuenow and aria-valuemax', () => {
    component.value = 30;
    component.max = 100;
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.progress-wrapper');
    expect(wrapper.getAttribute('aria-valuenow')).toBe('30');
    expect(wrapper.getAttribute('aria-valuemax')).toBe('100');
  });
});
