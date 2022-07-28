import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { AddStepComponent } from './add.component';

describe('AddStepComponent', () => {
  let component: AddStepComponent;
  let fixture: ComponentFixture<AddStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStepComponent ],
      providers: [ MatSnackBar, Overlay, FormBuilder ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
