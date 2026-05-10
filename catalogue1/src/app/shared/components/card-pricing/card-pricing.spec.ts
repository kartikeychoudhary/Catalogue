import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPricingComponent } from './card-pricing';
import { SharedModule } from '@shared/index';

describe('CardPricingComponent', () => {
  let fixture: ComponentFixture<CardPricingComponent>;
  let component: CardPricingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPricingComponent);
    component = fixture.componentInstance;
  });

  function getArticle(): HTMLElement {
    return fixture.nativeElement.querySelector('article')!;
  }

  it('renders an article with card and card-pricing classes', () => {
    component.price = '99€';
    fixture.detectChanges();
    const article = getArticle();
    expect(article.classList.contains('card')).toBe(true);
    expect(article.classList.contains('card-pricing')).toBe(true);
  });

  it('renders price with period', () => {
    component.price = '99€';
    component.period = 'mo';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.price')!;
    expect(el.textContent).toContain('99€');
    expect(el.textContent).toContain('/mo');
  });

  it('renders description', () => {
    component.description = 'Perfect for teams';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.description')!;
    expect(el.textContent).toContain('Perfect for teams');
  });

  it('renders features list', () => {
    component.features = ['Feature A', 'Feature B'];
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Feature A');
    expect(items[1].textContent).toContain('Feature B');
  });

  it('renders CTA button with label', () => {
    component.ctaLabel = 'Subscribe';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.btn-cta')!;
    expect(btn.textContent).toContain('Subscribe');
  });

  it('does not render CTA when label is empty', () => {
    component.ctaLabel = '';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.btn-cta');
    expect(btn).toBeNull();
  });

  it('emits ctaClicked on button click', () => {
    let emitted = false;
    component.ctaClicked.subscribe(() => { emitted = true; });
    component.ctaLabel = 'Subscribe';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.btn-cta') as HTMLElement;
    btn.click();
    expect(emitted).toBe(true);
  });

  it('does not render features list when empty', () => {
    component.features = [];
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(0);
  });
});
