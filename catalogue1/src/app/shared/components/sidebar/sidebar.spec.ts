import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar';
import { SharedModule } from '@shared/index';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  function getSidebar(): HTMLElement {
    return fixture.nativeElement.querySelector('.fake-side')!;
  }

  it('renders the sidebar', () => {
    fixture.detectChanges();
    expect(getSidebar()).toBeTruthy();
  });

  it('renders section headings', () => {
    component.sections = [
      { heading: 'Category', items: [] },
      { heading: 'Tags', items: [] },
    ];
    fixture.detectChanges();
    const headings = getSidebar().querySelectorAll('h6');
    expect(headings.length).toBe(2);
    expect(headings[0].textContent).toContain('Category');
    expect(headings[1].textContent).toContain('Tags');
  });

  it('renders items in sections', () => {
    component.sections = [
      {
        heading: 'Category',
        items: [{ label: 'Design' }, { label: 'Development' }],
      },
    ];
    fixture.detectChanges();
    const items = getSidebar().querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Design');
    expect(items[1].textContent).toContain('Development');
  });

  it('highlights active item', () => {
    component.sections = [
      {
        heading: 'Category',
        items: [
          { label: 'Design', active: true },
          { label: 'Development' },
        ],
      },
    ];
    fixture.detectChanges();
    const items = getSidebar().querySelectorAll('li');
    expect(items[0].classList.contains('-active')).toBe(true);
    expect(items[1].classList.contains('-active')).toBe(false);
  });

  it('renders counts', () => {
    component.sections = [
      {
        heading: 'Category',
        items: [{ label: 'Design', count: 12 }],
      },
    ];
    fixture.detectChanges();
    const count = getSidebar().querySelector('.count');
    expect(count!.textContent).toContain('12');
  });

  it('does not render count when not provided', () => {
    component.sections = [
      {
        heading: 'Category',
        items: [{ label: 'Design' }],
      },
    ];
    fixture.detectChanges();
    expect(getSidebar().querySelector('.count')).toBeNull();
  });

  it('handles empty sections', () => {
    component.sections = [];
    fixture.detectChanges();
    expect(getSidebar().querySelectorAll('h6').length).toBe(0);
  });
});
