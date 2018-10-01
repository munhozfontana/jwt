import { apiUrl } from './../app.api';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: String, password: String) {
    console.log(username, password);
    return this.http.post<any>(`${apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        console.log(user);
        if (user && user['token']) {
          localStorage.setItem('token', user['token']);
          localStorage.setItem('name', user['firstName']);
          localStorage.setItem('lastName', user['lastName']);
        }

        return user;
      })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
  }

}
