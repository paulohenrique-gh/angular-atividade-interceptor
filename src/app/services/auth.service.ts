import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/auth/'

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.url}login`, user);
  }
}
