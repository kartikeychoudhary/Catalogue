import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs';
import { SharedModule } from '@shared/index';

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  function getNav(): HTMLElement {
    return fixture.nativeElement.querySelector('.crumb')!;
  }

  it('renders the crumb container', () => {
    fixture.detectChanges();
    expect(getNav()).toBeTruthy();
  });

  it('renders crumbs with links', () => {
    component.crumbs = [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Page', href: '/section/page' },
    ];
    fixture.detectChanges();
    const links = getNav().querySelectorAll('a');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Home');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].textContent).toContain('Section');
    expect(links[2].textContent).toContain('Page');
  });

  it('renders separators between crumbs', () => {
    component.crumbs = [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
    ];
    fixture.detectChanges();
    const separators = getNav().querySelectorAll('.sep');
    expect(separators.length).toBe(1);
  });

  it('does not render separator after last crumb', () => {
    component.crumbs = [
      { label: 'Home', href: '/' },
    ];
    fixture.detectChanges();
    expect(getNav().querySelector('.sep')).toBeNull();
  });

  it('handles empty crumbs', () => {
    component.crumbs = [];
    fixture.detectChanges();
    expect(getNav().querySelectorAll('a').length).toBe(0);
  });
});
