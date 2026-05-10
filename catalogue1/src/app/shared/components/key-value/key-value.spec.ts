import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyValueComponent } from './key-value';
import { SharedModule } from '@shared/index';

describe('KeyValueComponent', () => {
  let fixture: ComponentFixture<KeyValueComponent>;
  let component: KeyValueComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyValueComponent);
    component = fixture.componentInstance;
  });

  it('renders dl.kv element', () => {
    component.items = [];
    fixture.detectChanges();
    const dl = fixture.nativeElement.querySelector('.kv');
    expect(dl).toBeTruthy();
    expect(dl.tagName).toBe('DL');
  });

  it('renders dt/dd pairs for items', () => {
    component.items = [
      { key: 'Name', value: 'Alice' },
      { key: 'Role', value: 'Admin' },
    ];
    fixture.detectChanges();

    const dts = fixture.nativeElement.querySelectorAll('dt');
    const dds = fixture.nativeElement.querySelectorAll('dd');

    expect(dts.length).toBe(2);
    expect(dds.length).toBe(2);
    expect(dts[0].textContent).toContain('Name');
    expect(dds[0].textContent).toContain('Alice');
    expect(dts[1].textContent).toContain('Role');
    expect(dds[1].textContent).toContain('Admin');
  });

  it('renders empty when no items', () => {
    component.items = [];
    fixture.detectChanges();
    const dts = fixture.nativeElement.querySelectorAll('dt');
    expect(dts.length).toBe(0);
  });
});
