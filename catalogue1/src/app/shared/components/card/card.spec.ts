import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card';
import { SharedModule } from '@shared/index';

@Component({
  standalone: false,
  template: `
    <app-card>
      <div card-header>Header</div>
      <div>Body</div>
      <div card-footer>Footer</div>
    </app-card>
  `,
})
class HostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  function getArticle(): HTMLElement {
    return fixture.nativeElement.querySelector('article');
  }

  it('renders an article element with class card', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article).toBeTruthy();
    expect(article!.classList.contains('card')).toBe(true);
  });

  it('renders header slot content', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article!.textContent).toContain('Header');
  });

  it('renders default slot content', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article!.textContent).toContain('Body');
  });

  it('renders footer slot content', () => {
    fixture.detectChanges();
    const article = getArticle();
    expect(article!.textContent).toContain('Footer');
  });
});
