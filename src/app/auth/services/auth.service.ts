import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, AuthRes } from '../models';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginInfo){
    return this.http.post<AuthRes>(environment.serverUrl + 'token/', data)
  }

  canAccessLogin(): Observable<boolean> {
    let token = localStorage.getItem('access_token');
    if (!token) return of(true);
    return this.http.post(
      environment.serverUrl + 'token/verify/',
      { token: token }
    ).pipe(
      map(() => {
        return false;
      }),
      catchError(() => {
        localStorage.removeItem('access_token');
        return of(true);
      })
    )
  }

  
  logout(){
    localStorage.removeItem('access_token');
  }
}
