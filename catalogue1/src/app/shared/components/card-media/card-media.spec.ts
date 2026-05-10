import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMediaComponent } from './card-media';
import { SharedModule } from '@shared/index';

describe('CardMediaComponent', () => {
  let fixture: ComponentFixture<CardMediaComponent>;
  let component: CardMediaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMediaComponent);
    component = fixture.componentInstance;
  });

  it('renders an article with card and card-media classes', () => {
    fixture.detectChanges();
    const article = fixture.nativeElement.querySelector('article')!;
    expect(article.classList.contains('card')).toBe(true);
    expect(article.classList.contains('card-media')).toBe(true);
  });

  it('renders image placeholder with aria-label', () => {
    component.imageAlt = 'A mountain landscape';
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.img')!;
    expect(img.getAttribute('aria-label')).toBe('A mountain landscape');
    expect(img.getAttribute('role')).toBe('img');
  });

  it('renders eyebrow', () => {
    component.eyebrow = 'Feature';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.eyebrow')!.textContent).toContain('Feature');
  });

  it('renders title', () => {
    component.title = 'Swiss Design';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.title')!.textContent).toContain('Swiss Design');
  });

  it('renders description', () => {
    component.description = 'A deep dive into editorial design.';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.desc')!.textContent).toContain('A deep dive into editorial design.');
  });

  it('renders meta footer', () => {
    component.metaLabel = 'DATE';
    component.metaValue = '2025';
    fixture.detectChanges();
    const meta = fixture.nativeElement.querySelector('.meta')!;
    expect(meta.textContent).toContain('DATE');
    expect(meta.textContent).toContain('2025');
  });

  it('hides eyebrow when empty', () => {
    component.eyebrow = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.eyebrow')).toBeNull();
  });

  it('hides meta when both empty', () => {
    component.metaLabel = '';
    component.metaValue = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.meta')).toBeNull();
  });
});
