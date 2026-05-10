import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state';
import { SharedModule } from '@shared/index';

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;
  let component: EmptyStateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
  });

  it('renders empty state container', () => {
    component.title = 'Nothing here';
    component.description = 'No results found';
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.empty');
    expect(el).toBeTruthy();
  });

  it('renders title in h5', () => {
    component.title = 'Empty Title';
    component.description = 'Desc';
    fixture.detectChanges();

    const h5 = fixture.nativeElement.querySelector('h5');
    expect(h5).toBeTruthy();
    expect(h5!.textContent).toContain('Empty Title');
  });

  it('renders description in p', () => {
    component.title = 'Title';
    component.description = 'Something went wrong';
    fixture.detectChanges();

    const p = fixture.nativeElement.querySelector('p');
    expect(p).toBeTruthy();
    expect(p!.textContent).toContain('Something went wrong');
  });

  it('does not render action button when no actionLabel', () => {
    component.title = 'Title';
    component.description = 'Desc';
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeFalsy();
  });

  it('renders action button when actionLabel is provided', () => {
    component.title = 'Title';
    component.description = 'Desc';
    component.actionLabel = 'Retry';
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.empty-action');
    expect(btn).toBeTruthy();
    expect(btn!.textContent).toContain('Retry');
  });

  it('emits actionClick on button click', () => {
    const emitted: unknown[] = [];
    component.actionClick.subscribe(() => emitted.push(true));
    component.title = 'Title';
    component.description = 'Desc';
    component.actionLabel = 'Retry';
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.empty-action');
    btn!.click();

    expect(emitted.length).toBe(1);
  });
});
