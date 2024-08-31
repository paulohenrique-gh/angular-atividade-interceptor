import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../../models/user-login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: UserLogin = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      {
        next: () => {
          this.router.navigate(['home']);
        },
        error: () => alert("Invalid user or password")
      }
    );
  }
}
