import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WashesListComponent } from './washes-list.component';

describe('WashesListComponent', () => {
  let component: WashesListComponent;
  let fixture: ComponentFixture<WashesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashesListComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
