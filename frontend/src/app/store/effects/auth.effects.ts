import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthStateService } from 'src/app/shared/services/authState.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage),
      concatMap((action) =>
        this.authService.login(action.fromData)
        .pipe(
          map((data) => AuthActions.loginSuccess({ data: data })),
          catchError((error) => of(AuthActions.loginFail({ error })))
        )
        .pipe(tap((data) => this.handleLoginResponse(data)))
      )
    )
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerPage),
      concatMap((action) =>
        this.authService.register(action.fromData).pipe(
          map((user) => AuthActions.registerSuccess({ data: user })),
          catchError((error) => of(AuthActions.registerFail({ error })))
        )
      )
    )
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private authStateService: AuthStateService,
    private userService: UserService
  ) { }

  handleLoginResponse(info: any) {
    const token = info.data.token.access_token;
    const user = info.data.user[0];

    this.tokenService.handle(token);
    this.authStateService.setAuthState(true);
    this.userService.setRole(user.is_admin);
    this.userService.setId(user.id);
    this.authStateService.setRoleState(this.userService.isAdmin());
    if (this.userService.getRole() === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.userService.getRole() === 'customer') {
      this.router.navigate(['home']);
    }
  }
}
