import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStatComponent } from './card-stat';
import { SharedModule } from '@shared/index';

describe('CardStatComponent', () => {
  let fixture: ComponentFixture<CardStatComponent>;
  let component: CardStatComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardStatComponent);
    component = fixture.componentInstance;
  });

  function getArticle(): HTMLElement {
    return fixture.nativeElement.querySelector('article')!;
  }

  it('renders an article with card and card-stat classes', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article.classList.contains('card')).toBe(true);
    expect(article.classList.contains('card-stat')).toBe(true);
  });

  it('renders eyebrow', () => {
    component.eyebrow = 'Revenue';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-label')!.textContent).toContain('Revenue');
  });

  it('renders value', () => {
    component.value = '42K';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-num')!.textContent).toContain('42K');
  });

  it('renders positive delta with up arrow', () => {
    component.delta = '12%';
    component.deltaDirection = 'up';
    fixture.detectChanges();
    const deltaEl = fixture.nativeElement.querySelector('.stat-delta')!;
    expect(deltaEl.textContent).toContain('12%');
    expect(deltaEl.textContent).toContain('↑');
    expect(deltaEl.classList.contains('-neg')).toBe(false);
  });

  it('renders negative delta with down arrow and -neg class', () => {
    component.delta = '5%';
    component.deltaDirection = 'down';
    fixture.detectChanges();
    const deltaEl = fixture.nativeElement.querySelector('.stat-delta')!;
    expect(deltaEl.textContent).toContain('↓');
    expect(deltaEl.classList.contains('-neg')).toBe(true);
  });

  it('renders caption', () => {
    component.caption = 'vs last quarter';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-caption')!.textContent).toContain('vs last quarter');
  });

  it('defaults deltaDirection to up', () => {
    component.delta = '8%';
    fixture.detectChanges();
    const deltaEl = fixture.nativeElement.querySelector('.stat-delta')!;
    expect(deltaEl.classList.contains('-neg')).toBe(false);
  });

  it('hides delta when empty', () => {
    component.delta = '';
    fixture.detectChanges();
    const deltaEl = fixture.nativeElement.querySelector('.stat-delta');
    expect(deltaEl).toBeNull();
  });
});
