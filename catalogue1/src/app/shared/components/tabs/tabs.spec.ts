import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs';
import { SharedModule } from '@shared/index';

describe('TabsComponent', () => {
  let fixture: ComponentFixture<TabsComponent>;
  let component: TabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
  });

  function getTabs(): HTMLElement {
    return fixture.nativeElement.querySelector('.tabs')!;
  }

  it('renders tabs container', () => {
    fixture.detectChanges();
    expect(getTabs()).toBeTruthy();
  });

  it('renders tab buttons', () => {
    component.tabs = [
      { label: 'Overview' },
      { label: 'Details' },
    ];
    fixture.detectChanges();
    const buttons = getTabs().querySelectorAll('.tab');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Overview');
    expect(buttons[1].textContent).toContain('Details');
  });

  it('highlights active tab by index', () => {
    component.tabs = [
      { label: 'Overview' },
      { label: 'Details' },
    ];
    component.activeTab = 1;
    fixture.detectChanges();
    const buttons = getTabs().querySelectorAll('.tab');
    expect(buttons[0].classList.contains('-active')).toBe(false);
    expect(buttons[1].classList.contains('-active')).toBe(true);
  });

  it('defaults to first tab active', () => {
    component.tabs = [
      { label: 'Overview' },
      { label: 'Details' },
    ];
    fixture.detectChanges();
    const buttons = getTabs().querySelectorAll('.tab');
    expect(buttons[0].classList.contains('-active')).toBe(true);
    expect(buttons[1].classList.contains('-active')).toBe(false);
  });

  it('emits tabChange on click', () => {
    let emitted = -1;
    component.tabChange.subscribe((i: number) => { emitted = i; });
    component.tabs = [
      { label: 'Overview' },
      { label: 'Details' },
    ];
    fixture.detectChanges();
    (getTabs().querySelectorAll('.tab')[1] as HTMLElement).click();
    expect(emitted).toBe(1);
  });

  it('handles empty tabs array', () => {
    component.tabs = [];
    fixture.detectChanges();
    expect(getTabs().querySelectorAll('.tab').length).toBe(0);
  });
});
