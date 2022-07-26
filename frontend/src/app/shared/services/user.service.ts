import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.http.get(environment.api + '/users/single/' + this.userId);
  }

  checkForUserId() {
    return localStorage.getItem('userId') === null && localStorage.getItem('userId') !== '';
  }

  setId(id: number) {
    return localStorage.setItem('userId', String(id));
  }

  get userId() {
    return +localStorage.getItem('userId')!;
  }

  removeId() {
    return localStorage.removeItem('userId');
  }

  setRole(isAdmin: number) {
    let role = '';
    isAdmin === 1 ? role = 'admin' : 'customer';
    return localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  removeRole() {
    return localStorage.removeItem('role');
  }

  isAdmin(): boolean {
    if (this.getRole() && this.getRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }

}
