import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, AuthRes } from '../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginInfo){
    return this.http.post<AuthRes>(environment.serverUrl + 'token/', data)
  }
}
