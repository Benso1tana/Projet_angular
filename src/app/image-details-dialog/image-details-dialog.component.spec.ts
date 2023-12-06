import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsDialogComponent } from './image-details-dialog.component';

describe('ImageDetailsDialogComponent', () => {
  let component: ImageDetailsDialogComponent;
  let fixture: ComponentFixture<ImageDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(ImageDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
