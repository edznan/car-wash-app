import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/services/authState.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private authStateService: AuthStateService,
    private tokenService: TokenService,
    private userService: UserService,
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authStateService.setAuthState(false);
    this.authStateService.setRoleState(false);
    this.tokenService.removeToken();
    this.userService.removeRole();
    this.userService.removeId();
    this.router.navigate(['auth']);
  }

}
