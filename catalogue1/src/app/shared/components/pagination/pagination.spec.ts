import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination';
import { SharedModule } from '@shared/index';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  function getPager(): HTMLElement {
    return fixture.nativeElement.querySelector('.pager')!;
  }

  it('renders the pager container', () => {
    fixture.detectChanges();
    expect(getPager()).toBeTruthy();
  });

  it('renders correct number of pages for small total', () => {
    component.current = 1;
    component.total = 5;
    fixture.detectChanges();
    const buttons = getPager().querySelectorAll('.page');
    expect(buttons.length).toBe(5);
  });

  it('highlights active page', () => {
    component.current = 3;
    component.total = 5;
    fixture.detectChanges();
    const buttons = getPager().querySelectorAll('.page');
    expect(buttons[2].classList.contains('-active')).toBe(true);
  });

  it('emits pageChange on page click', () => {
    let emitted = -1;
    component.pageChange.subscribe((p: number) => { emitted = p; });
    component.total = 5;
    fixture.detectChanges();
    (getPager().querySelectorAll('.page')[2] as HTMLElement).click();
    expect(emitted).toBe(3);
  });

  it('shows ellipsis for large totals', () => {
    component.current = 5;
    component.total = 20;
    fixture.detectChanges();
    const ellipsis = getPager().querySelectorAll('.ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('emits pageChange on prev click', () => {
    let emitted = -1;
    component.pageChange.subscribe((p: number) => { emitted = p; });
    component.current = 3;
    component.total = 5;
    fixture.detectChanges();
    (getPager().querySelector('.prev') as HTMLElement).click();
    expect(emitted).toBe(2);
  });

  it('emits pageChange on next click', () => {
    let emitted = -1;
    component.pageChange.subscribe((p: number) => { emitted = p; });
    component.current = 3;
    component.total = 5;
    fixture.detectChanges();
    (getPager().querySelector('.next') as HTMLElement).click();
    expect(emitted).toBe(4);
  });

  it('disables prev when on first page', () => {
    component.current = 1;
    component.total = 5;
    fixture.detectChanges();
    expect((getPager().querySelector('.prev') as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables next when on last page', () => {
    component.current = 5;
    component.total = 5;
    fixture.detectChanges();
    expect((getPager().querySelector('.next') as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders no pages for zero total', () => {
    component.total = 0;
    fixture.detectChanges();
    expect(getPager().querySelectorAll('.page').length).toBe(0);
  });

  it('does not emit on prev when on first page', () => {
    let emitted = false;
    component.pageChange.subscribe(() => { emitted = true; });
    component.current = 1;
    component.total = 5;
    fixture.detectChanges();
    (getPager().querySelector('.prev') as HTMLElement).click();
    expect(emitted).toBe(false);
  });
});
