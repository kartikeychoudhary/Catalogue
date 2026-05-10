import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon';
import { IconRegistryService } from '@core/services/icon-registry.service';
import { SharedModule } from '@shared/index';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  const mockRegistry = {
    resolve: (name: string) => `#icon-${name}`,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: IconRegistryService, useValue: mockRegistry },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  function getSvg(): SVGElement {
    return fixture.nativeElement.querySelector('svg')!;
  }

  function getUse(): SVGUseElement {
    return fixture.nativeElement.querySelector('use')!;
  }

  it('renders an svg element', () => {
    fixture.detectChanges();
    expect(getSvg()).toBeTruthy();
  });

  it('renders a use element with correct href', () => {
    component.name = 'search';
    fixture.detectChanges();
    const use = getUse();
    expect(use.getAttribute('href')).toBe('#icon-search');
  });

  it('defaults size to md (20px)', () => {
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('width')).toBe('20');
    expect(svg.getAttribute('height')).toBe('20');
  });

  it('respects xs size (12px)', () => {
    component.size = 'xs';
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('width')).toBe('12');
    expect(svg.getAttribute('height')).toBe('12');
  });

  it('respects lg size (24px)', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('respects numeric size', () => {
    component.size = 48;
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('width')).toBe('48');
    expect(svg.getAttribute('height')).toBe('48');
  });

  it('sets aria-hidden when no ariaLabel', () => {
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets role="img" when ariaLabel provided', () => {
    component.ariaLabel = 'Search icon';
    component.name = 'search';
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Search icon');
  });

  it('does not set role when no ariaLabel', () => {
    fixture.detectChanges();
    const svg = getSvg();
    expect(svg.hasAttribute('role')).toBe(false);
  });

  it('resolves different icon names', () => {
    component.name = 'close';
    fixture.detectChanges();
    const use = getUse();
    expect(use.getAttribute('href')).toBe('#icon-close');
  });
});
