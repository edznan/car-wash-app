import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  handle(token: string) {
    this.setToken(token);
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.getToken();

    if (token && token !== undefined) {
      const payload = this.payload(token);
      if (payload) {
        return (payload.iss === environment.api + '/auth/login') ? true : false;
      }
    }
    return false;
  }

  payload(token: string) {
    return this.decode(token.split('.')[1]);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  refresh() {
    this.http.get(environment.api + '/auth/refresh');
  }

  loggedIn() {
    return this.isValid();
  }
}
