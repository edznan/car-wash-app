import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { EditStepComponent } from './edit.component';

describe('EditStepComponent', () => {
  let component: EditStepComponent;
  let fixture: ComponentFixture<EditStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStepComponent ],
      imports: [ MatDialogModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MatSnackBar, FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
