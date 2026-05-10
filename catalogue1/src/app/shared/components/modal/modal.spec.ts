import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal';
import { SharedModule } from '@shared/index';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-modal-host',
  standalone: false,
  template: `
    <app-modal [open]="modalOpen" title="Test Modal" (close)="onClose()">
      <p>Body content</p>
      <button modal-actions>Cancel</button>
    </app-modal>
  `,
})
class TestModalHostComponent {
  modalOpen = false;
  closed = false;
  onClose(): void {
    this.closed = true;
    this.modalOpen = false;
  }
}

describe('ModalComponent', () => {
  let hostFixture: ComponentFixture<TestModalHostComponent>;
  let hostComponent: TestModalHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TestModalHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestModalHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('does not render when closed', () => {
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.modal-stage')).toBeNull();
  });

  it('renders when open', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.modal-stage')).toBeTruthy();
  });

  it('renders title', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('h4').textContent).toBe('Test Modal');
  });

  it('renders projected content', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.querySelector('.modal-body p').textContent).toBe('Body content');
  });

  it('renders projected actions', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    const actions = hostFixture.nativeElement.querySelectorAll('.modal-actions button');
    expect(actions.length).toBe(1);
    expect(actions[0].textContent.trim()).toBe('Cancel');
  });

  it('emits close on Escape', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    hostFixture.detectChanges();
    expect(hostComponent.closed).toBe(true);
  });

  it('emits close on stage click', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    hostFixture.nativeElement.querySelector('.modal-stage').click();
    hostFixture.detectChanges();
    expect(hostComponent.closed).toBe(true);
  });

  it('has appropriate ARIA attributes', () => {
    hostComponent.modalOpen = true;
    hostFixture.detectChanges();
    const stage = hostFixture.nativeElement.querySelector('.modal-stage');
    expect(stage.getAttribute('role')).toBe('dialog');
    expect(stage.getAttribute('aria-modal')).toBe('true');
    expect(stage.getAttribute('aria-label')).toBe('Test Modal');
  });
});
