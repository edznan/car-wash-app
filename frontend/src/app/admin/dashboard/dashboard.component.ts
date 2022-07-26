import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  customersToday = 0;
  customersThisWeek = 0;
  programs = [
    'Interior',
    'Exterior'
  ];
  totalEarnings = 0;

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

  constructor(private breakpointObserver: BreakpointObserver) {}
}
