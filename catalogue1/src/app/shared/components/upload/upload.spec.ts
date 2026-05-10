import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponent } from './upload';
import { SharedModule } from '@shared/index';

describe('UploadComponent', () => {
  let fixture: ComponentFixture<UploadComponent>;
  let component: UploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
  });

  function getWrapper(): HTMLDivElement {
    return fixture.nativeElement.querySelector('.upload')!;
  }

  function getFileInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="file"]')!;
  }

  it('renders an upload area', () => {
    fixture.detectChanges();
    expect(getWrapper()).toBeTruthy();
  });

  it('renders label text', () => {
    component.label = 'Choose file';
    fixture.detectChanges();
    expect(getWrapper().textContent).toContain('Choose file');
  });

  it('has default label', () => {
    fixture.detectChanges();
    expect(getWrapper().textContent).toContain('Upload file');
  });

  it('contains hidden file input', () => {
    fixture.detectChanges();
    const input = getFileInput();
    expect(input).toBeTruthy();
    expect(input.hasAttribute('hidden')).toBe(true);
  });

  it('sets accept attribute on file input', () => {
    component.accept = '.pdf,.doc';
    fixture.detectChanges();
    expect(getFileInput().getAttribute('accept')).toBe('.pdf,.doc');
  });

  it('emits fileSelected when file is chosen', () => {
    let emittedFile: File | undefined;
    component.fileSelected.subscribe((file: File) => {
      emittedFile = file;
    });

    fixture.detectChanges();
    const testFile = new File(['test'], 'test.txt', {
      type: 'text/plain',
    });
    const fileList = {
      0: testFile,
      length: 1,
      item: () => testFile,
    } as unknown as FileList;

    Object.defineProperty(getFileInput(), 'files', {
      value: fileList,
    });
    getFileInput().dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(emittedFile).toBe(testFile);
  });

  it('has role button for accessibility', () => {
    fixture.detectChanges();
    expect(getWrapper().getAttribute('role')).toBe('button');
  });

  it('has tabindex 0 for keyboard access', () => {
    fixture.detectChanges();
    expect(getWrapper().getAttribute('tabindex')).toBe('0');
  });

  it('has aria-label', () => {
    component.label = 'Upload document';
    fixture.detectChanges();
    expect(getWrapper().getAttribute('aria-label')).toBe('Upload document');
  });
});
