import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { delay, Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { LoggedInUser } from '../../../models/logged-in-user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUserSubscription!: Subscription | null;
  user!: LoggedInUser | null | undefined;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userService.loadCurrentUser();
    this.currentUserSubscription = this.userService
      .getCurrentUserObservable()
      .pipe(delay(2000))
      .subscribe({
        next: (data: LoggedInUser | null) => {
          this.user = data;
        },
        error: (error) => {
          console.log('Error logging in: ', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
