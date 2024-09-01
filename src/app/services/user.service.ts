import { Injectable } from '@angular/core';
import { LoggedInUser } from '../models/logged-in-user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `http://localhost:8080/user/my-info`;
  private currentUserSubject = new BehaviorSubject<LoggedInUser | null>(null);
  private currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadCurrentUser(): void {
    this.httpClient
      .get<LoggedInUser>(this.url)
      .pipe(
        tap((user) => this.currentUserSubject.next(user)),
        catchError(error => {
          this.currentUserSubject.next(null);
          throw error;
        })
      ).subscribe({
        error: (error) => console.log(error)
      })
  }

  getCurrentUserObservable(): Observable<LoggedInUser | null> {
    return this.currentUser$;
  }
}
