import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from '../models/token-response';
import { UserRegistration } from '../models/user-registration';
import { GenericResponse } from '../models/generic-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/auth/';
  private availableRoles = ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'];

  constructor(private httpClient: HttpClient) {}

  getAvailableRoles(): string[] {
    return this.availableRoles;
  }

  login(user: UserLogin): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.url}login`, user).pipe(
      tap((res: TokenResponse) => {
        localStorage.setItem("token", res.token);
        return res;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  register(user: UserRegistration): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.url}register`, user);
  }

  logout(): void {
    this.httpClient.post<GenericResponse>(`${this.url}logout`, {}).subscribe({
      error: (error) => console.log(error)
    });
    localStorage.removeItem('token');
  }
}
