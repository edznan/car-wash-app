import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { AddProgramComponent } from './add.component';

describe('AddProgramComponent', () => {
  let component: AddProgramComponent;
  let fixture: ComponentFixture<AddProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ MatSnackBar, Overlay, FormBuilder ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
