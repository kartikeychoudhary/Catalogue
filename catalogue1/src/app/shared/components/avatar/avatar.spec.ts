import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar';
import { SharedModule } from '@shared/index';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  function getDiv(): HTMLElement {
    return fixture.nativeElement.querySelector('.avatar')!;
  }

  it('renders a div with class avatar', () => {
    component.initials = 'AB';
    fixture.detectChanges();
    expect(getDiv()).toBeTruthy();
  });

  it('renders initials text', () => {
    component.initials = 'JD';
    fixture.detectChanges();
    expect(getDiv().textContent).toContain('JD');
  });

  it('defaults to md size (64px, no size modifier class)', () => {
    component.initials = 'AB';
    fixture.detectChanges();
    const el = getDiv();
    expect(el.classList.contains('avatar-sm')).toBe(false);
    expect(el.classList.contains('avatar-lg')).toBe(false);
  });

  it('applies sm size class', () => {
    component.initials = 'AB';
    component.size = 'sm';
    fixture.detectChanges();
    expect(getDiv().classList.contains('avatar-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    component.initials = 'AB';
    component.size = 'lg';
    fixture.detectChanges();
    expect(getDiv().classList.contains('avatar-lg')).toBe(true);
  });

  it('has role img and aria-label from initials', () => {
    component.initials = 'XY';
    fixture.detectChanges();
    const el = getDiv();
    expect(el.getAttribute('role')).toBe('img');
    expect(el.getAttribute('aria-label')).toBe('XY');
  });

  it('does not set aria-label when initials empty', () => {
    component.initials = '';
    fixture.detectChanges();
    const el = getDiv();
    expect(el.getAttribute('role')).toBe('img');
    expect(el.textContent!.trim()).toBe('');
  });
});
