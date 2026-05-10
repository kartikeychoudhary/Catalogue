import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BottomNavComponent } from './bottom-nav';
import { SharedModule } from '@shared/index';

describe('BottomNavComponent', () => {
  let fixture: ComponentFixture<BottomNavComponent>;
  let component: BottomNavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavComponent);
    component = fixture.componentInstance;
  });

  function getNav(): HTMLElement {
    return fixture.nativeElement.querySelector('.bottom-nav')!;
  }

  it('renders the bottom nav container', () => {
    fixture.detectChanges();
    expect(getNav()).toBeTruthy();
  });

  it('renders items', () => {
    component.items = [
      { label: 'Home' },
      { label: 'Search' },
      { label: 'Settings' },
    ];
    fixture.detectChanges();
    const buttons = getNav().querySelectorAll('button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Home');
    expect(buttons[1].textContent).toContain('Search');
    expect(buttons[2].textContent).toContain('Settings');
  });

  it('highlights active item', () => {
    component.items = [
      { label: 'Home' },
      { label: 'Search', active: true },
      { label: 'Settings' },
    ];
    fixture.detectChanges();
    const buttons = getNav().querySelectorAll('button');
    expect(buttons[0].classList.contains('-active')).toBe(false);
    expect(buttons[1].classList.contains('-active')).toBe(true);
    expect(buttons[2].classList.contains('-active')).toBe(false);
  });

  it('emits itemClick on click', () => {
    let emitted = '';
    component.itemClick.subscribe((label: string) => { emitted = label; });
    component.items = [
      { label: 'Home' },
      { label: 'Search' },
    ];
    fixture.detectChanges();
    (getNav().querySelectorAll('button')[1] as HTMLElement).click();
    expect(emitted).toBe('Search');
  });

  it('handles empty items array', () => {
    component.items = [];
    fixture.detectChanges();
    expect(getNav().querySelectorAll('button').length).toBe(0);
  });
});
