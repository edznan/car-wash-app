import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/authState.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authStateService: AuthStateService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authStateService.userAuthState.subscribe((res: any) => {
      if (!res) {
        this.router.navigate(['auth'])
      } else {
        this.authStateService.isAdminState.subscribe(res => {
          if (res) {
            this.router.navigate(['admin']);
          }
        });
      }
      return false;
    });
    return true;
  }

}
