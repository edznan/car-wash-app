import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { EditBillingComponent } from './edit.component';

describe('EditBillingComponent', () => {
  let component: EditBillingComponent;
  let fixture: ComponentFixture<EditBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillingComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FormBuilder, MatSnackBar,
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
