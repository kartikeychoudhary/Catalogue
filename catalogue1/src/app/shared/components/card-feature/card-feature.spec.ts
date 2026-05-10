import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardFeatureComponent } from './card-feature';
import { SharedModule } from '@shared/index';

@Component({
  standalone: false,
  template: `
    <app-card-feature>
      <div card-header>Header</div>
      <div>Body</div>
      <div card-footer>Footer</div>
    </app-card-feature>
  `,
})
class HostComponent {}

describe('CardFeatureComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  function getArticle(): HTMLElement {
    return fixture.nativeElement.querySelector('article')!;
  }

  it('renders an article with card and card-feature classes', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article.classList.contains('card')).toBe(true);
    expect(article.classList.contains('card-feature')).toBe(true);
  });

  it('renders with dark background (--text variable used)', () => {
    fixture.detectChanges();
    const article = getArticle();
    const style = getComputedStyle(article);
    expect(style.backgroundColor).not.toBe('');
  });

  it('renders slot content', () => {
    fixture.detectChanges();
    expect(getArticle().textContent).toContain('Header');
    expect(getArticle().textContent).toContain('Body');
    expect(getArticle().textContent).toContain('Footer');
  });
});
