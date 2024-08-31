import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from '../models/token-response';
import { UserRegistration } from '../models/user-registration';
import { RegistrationResponse } from '../models/registration-response';
import { LoggedInUser } from '../models/logged-in-user';
import { UserService } from './user.service';

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
        console.log('na autenticação', res);
        localStorage.setItem("token", res.token);
        return res;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  register(user: UserRegistration): Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(`${this.url}register`, user);
  }
}
