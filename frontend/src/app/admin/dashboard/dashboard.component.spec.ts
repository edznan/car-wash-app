import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardComponent } from './dashboard.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { delay, of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('isLoading property should be true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('dashboard property should be of type object', () => {
    expect(typeof(component.dashboard)).toEqual('object');
  });

  it('cards array should have length greater than 0', waitForAsync(inject([BreakpointObserver], () => {
      component.cards.subscribe(res => expect(res.length).toBeGreaterThan(0));
  })));

  it('should get data from api', fakeAsync(() => {
    //
  }));

});
