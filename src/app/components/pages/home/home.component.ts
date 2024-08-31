import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoggedInUser } from '../../../models/logged-in-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser$!: Observable<LoggedInUser | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadCurrentUser();
    this.currentUser$ = this.userService.getCurrentUserObservable();
  }
}
