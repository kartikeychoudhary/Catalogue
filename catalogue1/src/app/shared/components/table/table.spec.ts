import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table';
import { SharedModule } from '@shared/index';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('renders column headers', () => {
    component.columns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
    ];
    component.rows = [{ name: 'Alice', role: 'Admin' }];
    fixture.detectChanges();

    const ths = fixture.nativeElement.querySelectorAll('th');
    expect(ths.length).toBe(2);
    expect(ths[0].textContent).toContain('Name');
    expect(ths[1].textContent).toContain('Role');
  });

  it('renders row data', () => {
    component.columns = [
      { key: 'name', label: 'Name' },
      { key: 'count', label: 'Count' },
    ];
    component.rows = [
      { name: 'Alice', count: 5 },
      { name: 'Bob', count: 12 },
    ];
    fixture.detectChanges();

    const tds = fixture.nativeElement.querySelectorAll('td');
    expect(tds[0].textContent).toContain('Alice');
    expect(tds[1].textContent).toContain('5');
    expect(tds[2].textContent).toContain('Bob');
    expect(tds[3].textContent).toContain('12');
  });

  it('renders the table-wrap with border style', () => {
    component.columns = [];
    component.rows = [];
    fixture.detectChanges();
    const wrap = fixture.nativeElement.querySelector('.table-wrap');
    expect(wrap).toBeTruthy();
  });

  it('adds .num class to numeric cells', () => {
    component.columns = [
      { key: 'name', label: 'Name' },
      { key: 'count', label: 'Count' },
    ];
    component.rows = [{ name: 'Alice', count: 42 }];
    fixture.detectChanges();

    const tds = fixture.nativeElement.querySelectorAll('td');
    expect(tds[0].classList.contains('num')).toBe(false);
    expect(tds[1].classList.contains('num')).toBe(true);
  });

  it('shows sort indicator on sortable column click', () => {
    component.columns = [
      { key: 'name', label: 'Name', sortable: true },
    ];
    component.rows = [];
    fixture.detectChanges();

    const th = fixture.nativeElement.querySelector('th');
    th.click();
    fixture.detectChanges();

    const arrow = th.querySelector('.sort-arrow');
    expect(arrow).toBeTruthy();
    expect(arrow.textContent).toContain('▴');
  });

  it('emits sort event on sortable column click', () => {
    const emitted: unknown[] = [];
    component.sort.subscribe((e) => emitted.push(e));
    component.columns = [
      { key: 'name', label: 'Name', sortable: true },
    ];
    component.rows = [];
    fixture.detectChanges();

    const th = fixture.nativeElement.querySelector('th');
    th.click();

    expect(emitted.length).toBe(1);
    expect((emitted[0] as Record<string, string>).column).toBe('name');
    expect((emitted[0] as Record<string, string>).direction).toBe('asc');
  });

  it('toggles sort direction on repeated click', () => {
    component.columns = [
      { key: 'name', label: 'Name', sortable: true },
    ];
    component.rows = [];
    fixture.detectChanges();

    const th = fixture.nativeElement.querySelector('th');
    th.click();
    fixture.detectChanges();

    let arrow = th.querySelector('.sort-arrow');
    expect(arrow.textContent).toContain('▴');

    th.click();
    fixture.detectChanges();

    arrow = th.querySelector('.sort-arrow');
    expect(arrow.textContent).toContain('▾');
  });

  it('does not emit sort for non-sortable columns', () => {
    const emitted: unknown[] = [];
    component.sort.subscribe((e) => emitted.push(e));
    component.columns = [
      { key: 'name', label: 'Name', sortable: false },
    ];
    component.rows = [];
    fixture.detectChanges();

    const th = fixture.nativeElement.querySelector('th');
    th.click();

    expect(emitted.length).toBe(0);
  });
});
