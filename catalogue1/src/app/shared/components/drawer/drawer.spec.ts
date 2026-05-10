import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer';
import { SharedModule } from '@shared/index';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-drawer-host',
  standalone: false,
  template: `
    <app-drawer [open]="drawerOpen" title="My Drawer" (close)="onClose()">
      <p>Drawer content</p>
    </app-drawer>
  `,
})
class TestDrawerHostComponent {
  drawerOpen = false;
  closed = false;
  onClose(): void {
    this.closed = true;
    this.drawerOpen = false;
  }
}

describe('DrawerComponent', () => {
  let hostFixture: ComponentFixture<TestDrawerHostComponent>;
  let hostComponent: TestDrawerHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TestDrawerHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestDrawerHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('does not apply open class when closed', () => {
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.drawer-stage').classList.contains('-open')).toBe(false);
  });

  it('applies open class when open', () => {
    hostComponent.drawerOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.drawer-stage').classList.contains('-open')).toBe(true);
  });

  it('renders title', () => {
    hostComponent.drawerOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('h5').textContent).toBe('My Drawer');
  });

  it('renders projected content', () => {
    hostComponent.drawerOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.drawer-content p').textContent).toBe('Drawer content');
  });

  it('emits close when close button clicked', () => {
    hostComponent.drawerOpen = true;
    hostFixture.detectChanges();
    hostFixture.nativeElement.querySelector('.drawer-close').click();
    expect(hostComponent.closed).toBe(true);
  });

  it('has ARIA attributes', () => {
    hostComponent.drawerOpen = true;
    hostFixture.detectChanges();
    const stage = hostFixture.nativeElement.querySelector('.drawer-stage');
    expect(stage.getAttribute('role')).toBe('complementary');
    expect(stage.getAttribute('aria-label')).toBe('My Drawer');
  });
});
