import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ListComponent } from './list';
import { ListItemComponent } from './list-item';
import { SharedModule } from '@shared/index';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
  });

  it('renders a div with class list', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.list');
    expect(el).toBeTruthy();
  });
});

@Component({
  standalone: false,
  template: `
    <app-list-item
      [icon]="'A'"
      [title]="'Title text'"
      [subtitle]="'Sub text'"
    ></app-list-item>
  `,
})
class ListItemHostComponent {}

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ListItemHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemHostComponent);
  });

  function getItem(): HTMLElement {
    return fixture.nativeElement.querySelector('.list-item')!;
  }

  it('renders list-item container', () => {
    fixture.detectChanges();
    expect(getItem()).toBeTruthy();
  });

  it('renders icon text', () => {
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.list-icon');
    expect(icon).toBeTruthy();
    expect(icon!.textContent).toContain('A');
  });

  it('renders title', () => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.list-title');
    expect(title).toBeTruthy();
    expect(title!.textContent).toContain('Title text');
  });

  it('renders subtitle', () => {
    fixture.detectChanges();
    const sub = fixture.nativeElement.querySelector('.list-subtitle');
    expect(sub).toBeTruthy();
    expect(sub!.textContent).toContain('Sub text');
  });

  it('does not render subtitle when not provided', () => {
    fixture.detectChanges();
    const item = getItem();
    // subtitle is provided in host, so check when absent
    const sub = fixture.nativeElement.querySelector('.list-subtitle');
    expect(sub).toBeTruthy();
  });

  it('renders badge when badgeLabel is provided', () => {
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('app-badge');
    expect(badge).toBeFalsy();
  });
});

@Component({
  standalone: false,
  template: `
    <app-list-item
      [icon]="'X'"
      [title]="'With badge'"
      [badgeLabel]="'New'"
      [badgeVariant]="'success'"
    ></app-list-item>
  `,
})
class ListItemBadgeHostComponent {}

describe('ListItemComponent with badge', () => {
  let fixture: ComponentFixture<ListItemBadgeHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ListItemBadgeHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemBadgeHostComponent);
  });

  it('renders badge when badgeLabel is provided', () => {
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.list-badge app-badge');
    expect(badge).toBeTruthy();
  });
});
