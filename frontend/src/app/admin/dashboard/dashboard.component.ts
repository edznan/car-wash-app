import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/shared/services/api.service';
import { Dashboard } from 'src/app/shared/models/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  isLoading = false;

  dashboard: Dashboard = {
    washesToday: 0,
    washesThisWeek: 0,
    earnings: 0,
    programs: []
  };

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Customers today', cols: 1, rows: 1 },
          { id: 2, title: 'Customers this week', cols: 1, rows: 1 },
          { id: 3, title: 'Total earnings', cols: 1, rows: 1 },
          { id: 4, title: 'Programs', cols: 1, rows: 1 }
        ];
      }

      return [
        { id: 1, title: 'Customers today', cols: 2, rows: 1 },
        { id: 2, title: 'Customers this week', cols: 1, rows: 1 },
        { id: 3, title: 'Total earnings', cols: 1, rows: 2 },
        { id: 4, title: 'Programs', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getDashboard();
  }

  getDashboard() {
    this.apiService.getDashboardInfo().subscribe((res: any ) => {
      this.dashboard = {
        washesToday: res.washes_today,
        washesThisWeek: res.washes_this_week,
        earnings: res.earnings,
        programs: res.programs
      }
      this.isLoading = false;
    });
  }
}
