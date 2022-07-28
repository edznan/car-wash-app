import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashComponent } from './wash.component';

describe('WashComponent', () => {
  let component: WashComponent;
  let fixture: ComponentFixture<WashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
