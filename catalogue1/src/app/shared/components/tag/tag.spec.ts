import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from './tag';
import { SharedModule } from '@shared/index';

describe('TagComponent', () => {
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
  });

  it('renders a span with class tag', () => {
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.tag');
    expect(span).toBeTruthy();
  });

  it('renders ng-content', () => {
    const el = document.createElement('span');
    el.textContent = 'My Tag';
    fixture.nativeElement.appendChild(el);
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.tag');
    expect(tag).toBeTruthy();
  });
});
