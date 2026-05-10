import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardProfileComponent } from './card-profile';
import { SharedModule } from '@shared/index';

describe('CardProfileComponent', () => {
  let fixture: ComponentFixture<CardProfileComponent>;
  let component: CardProfileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardProfileComponent);
    component = fixture.componentInstance;
  });

  it('renders an article with card and card-profile classes', () => {
    fixture.detectChanges();
    const article = fixture.nativeElement.querySelector('article')!;
    expect(article.classList.contains('card')).toBe(true);
    expect(article.classList.contains('card-profile')).toBe(true);
  });

  it('renders avatar initials', () => {
    component.avatarInitials = 'JD';
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.avatar')!;
    expect(avatar.textContent).toContain('JD');
  });

  it('renders name and role', () => {
    component.name = 'Jane Doe';
    component.role = 'Designer';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.name')!.textContent).toContain('Jane Doe');
    expect(fixture.nativeElement.querySelector('.role')!.textContent).toContain('Designer');
  });

  it('renders bio', () => {
    component.bio = 'A creative mind.';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.bio')!.textContent).toContain('A creative mind.');
  });

  it('renders meta label and value', () => {
    component.metaLabel = 'JOINED';
    component.metaValue = '2024';
    fixture.detectChanges();
    const meta = fixture.nativeElement.querySelector('.meta')!;
    expect(meta.textContent).toContain('JOINED');
    expect(meta.textContent).toContain('2024');
  });

  it('hides avatar when initials empty', () => {
    component.avatarInitials = '';
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar).toBeNull();
  });

  it('hides bio when empty', () => {
    component.bio = '';
    fixture.detectChanges();
    const bio = fixture.nativeElement.querySelector('.bio');
    expect(bio).toBeNull();
  });

  it('hides meta when both empty', () => {
    component.metaLabel = '';
    component.metaValue = '';
    fixture.detectChanges();
    const meta = fixture.nativeElement.querySelector('.meta');
    expect(meta).toBeNull();
  });
});
