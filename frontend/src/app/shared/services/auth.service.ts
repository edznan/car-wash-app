import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(value: any): Observable<any> {
    return this.http.post(environment.api + '/auth/login', value).pipe(
      switchMap((data: any) => {
        let resp = data;
        if (resp) {
          return of(resp);
        } else {
          return throwError('Login fail')
        }
      })
    );
  }

  register(value: any): Observable<any> {
    return this.http.post(environment.api + '/auth/register', value).pipe(
      switchMap((data: any) => {
        return of(data);
      })
    );
  }

  logout() {
    return this.http.get(environment.api + '/auth/logout');
  }
}
