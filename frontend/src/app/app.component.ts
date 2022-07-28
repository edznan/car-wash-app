import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './shared/services/authState.service';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn: boolean = false;

  title = 'Car Washing Service';

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {
    this.auth.userAuthState.subscribe(val => {
      this.isLoggedIn = val;
    });
  }
}
