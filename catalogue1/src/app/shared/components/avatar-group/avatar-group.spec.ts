import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarGroupComponent } from './avatar-group';
import { SharedModule } from '@shared/index';

describe('AvatarGroupComponent', () => {
  let fixture: ComponentFixture<AvatarGroupComponent>;
  let component: AvatarGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarGroupComponent);
    component = fixture.componentInstance;
  });

  it('renders avatar-group container', () => {
    component.avatars = ['AB', 'CD'];
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('.avatar-group');
    expect(group).toBeTruthy();
  });

  it('renders avatars up to max', () => {
    component.avatars = ['AB', 'CD', 'EF', 'GH'];
    component.max = 3;
    fixture.detectChanges();

    const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
    expect(avatars.length).toBe(3);
  });

  it('renders overflow count when more than max', () => {
    component.avatars = ['AB', 'CD', 'EF', 'GH', 'IJ'];
    component.max = 3;
    fixture.detectChanges();

    const more = fixture.nativeElement.querySelector('.more');
    expect(more).toBeTruthy();
    expect(more!.textContent).toContain('+2');
  });

  it('does not render overflow when within max', () => {
    component.avatars = ['AB', 'CD'];
    component.max = 3;
    fixture.detectChanges();

    const more = fixture.nativeElement.querySelector('.more');
    expect(more).toBeFalsy();
  });

  it('renders all avatars when below max', () => {
    component.avatars = ['AB'];
    component.max = 3;
    fixture.detectChanges();

    const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
    expect(avatars.length).toBe(1);
  });

  it('defaults max to 3', () => {
    component.avatars = ['AB', 'CD', 'EF', 'GH'];
    fixture.detectChanges();

    const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
    expect(avatars.length).toBe(3);
  });
});
