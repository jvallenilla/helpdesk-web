import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginInfo){
    return this.http.post(environment.serverUrl + 'login/', data)
  }
}
