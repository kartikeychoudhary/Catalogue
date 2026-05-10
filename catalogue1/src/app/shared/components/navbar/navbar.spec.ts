import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { SharedModule } from '@shared/index';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  function getNav(): HTMLElement {
    return fixture.nativeElement.querySelector('.fake-navbar')!;
  }

  it('renders the navbar container', () => {
    fixture.detectChanges();
    expect(getNav()).toBeTruthy();
  });

  it('renders the brand', () => {
    component.brand = 'Catalogue';
    fixture.detectChanges();
    expect(getNav().querySelector('.brand')!.textContent).toContain('Catalogue');
  });

  it('renders links', () => {
    component.links = [
      { label: 'Home', href: '/home' },
      { label: 'About', href: '/about' },
    ];
    fixture.detectChanges();
    const links = getNav().querySelectorAll('nav a');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('About');
  });

  it('highlights active link', () => {
    component.links = [
      { label: 'Home', href: '/home', active: true },
      { label: 'About', href: '/about' },
    ];
    fixture.detectChanges();
    const links = getNav().querySelectorAll('nav a');
    expect(links[0].classList.contains('-active')).toBe(true);
    expect(links[1].classList.contains('-active')).toBe(false);
  });

  it('emits linkClicked on link click', () => {
    let emitted = '';
    component.linkClicked.subscribe((href: string) => { emitted = href; });
    component.links = [{ label: 'Home', href: '/home' }];
    fixture.detectChanges();
    (getNav().querySelector('nav a') as HTMLElement).click();
    expect(emitted).toBe('/home');
  });

  it('renders cta button when ctaLabel is set', () => {
    component.ctaLabel = 'Get Started';
    fixture.detectChanges();
    expect(getNav().querySelector('.cta')!.textContent).toContain('Get Started');
  });

  it('does not render cta button when ctaLabel is not set', () => {
    fixture.detectChanges();
    expect(getNav().querySelector('.cta')).toBeNull();
  });

  it('emits ctaClicked on cta click', () => {
    let emitted = false;
    component.ctaClicked.subscribe(() => { emitted = true; });
    component.ctaLabel = 'Go';
    fixture.detectChanges();
    (getNav().querySelector('.cta') as HTMLElement).click();
    expect(emitted).toBe(true);
  });

  it('handles empty links array', () => {
    component.links = [];
    fixture.detectChanges();
    expect(getNav().querySelectorAll('nav a').length).toBe(0);
  });
});
