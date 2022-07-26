import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.tokenService.loggedIn()!);
  userAuthState = this.userState.asObservable();

  private adminState = new BehaviorSubject<boolean>(this.userService.isAdmin()!);
  isAdminState = this.adminState.asObservable();

  constructor(public tokenService: TokenService, private userService: UserService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }

  setRoleState(value: boolean) {
    this.adminState.next(value);
  }
}
