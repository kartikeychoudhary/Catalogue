import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search';
import { SharedModule } from '@shared/index';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input')!;
  }

  function getWrapper(): HTMLDivElement {
    return fixture.nativeElement.querySelector('.search')!;
  }

  it('renders a search input', () => {
    fixture.detectChanges();
    expect(getInput()).toBeTruthy();
    expect(getInput().getAttribute('type')).toBe('search');
  });

  it('renders with default placeholder', () => {
    fixture.detectChanges();
    expect(getInput().getAttribute('placeholder')).toBe('Search');
  });

  it('renders with custom placeholder', () => {
    component.placeholder = 'Find items...';
    fixture.detectChanges();
    expect(getInput().getAttribute('placeholder')).toBe('Find items...');
  });

  it('renders wrapper with search class', () => {
    fixture.detectChanges();
    expect(getWrapper()).toBeTruthy();
    expect(getWrapper().classList.contains('search')).toBe(true);
  });

  it('has accessible label', () => {
    fixture.detectChanges();
    expect(getInput().getAttribute('aria-label')).toBe('Search');
  });

  it('input has .input class', () => {
    fixture.detectChanges();
    expect(getInput().classList.contains('input')).toBe(true);
  });
});
