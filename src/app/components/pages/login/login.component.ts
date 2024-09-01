import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../../models/user-login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {'class': 'form-container'}
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
        error: () => alert('Invalid username or password')
      }
    );
  }
}
