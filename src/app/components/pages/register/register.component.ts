import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  host: {'class': 'form-container'}
})
export class RegisterComponent implements OnInit {
  usernameControl!: FormControl;
  passwordControl!: FormControl;
  roleControl!: FormControl;
  registrationForm!: FormGroup;

  roles: string[] = [];

  errorMessage: string = '';

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router
  ) {}

  ngOnInit(): void {
     this.roles = this.authService.getAvailableRoles();

    this.usernameControl = this.formBuilder.control('', [Validators.required]);
    this.passwordControl = this.formBuilder.control('', [Validators.required]);
    this.roleControl = this.formBuilder.control('', [
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        return this.roles.includes(control.value) ? null : { invalidRole: true };
      },
    ]);
    this.registrationForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
      role: this.roleControl
    })
     
  }

  onSubmit(): void {
    this.authService.register(this.registrationForm.value).subscribe({
      next: () => this.router.navigate(['login']),
      error: (e) => {
        this.errorMessage = 'Something went wrong';
        alert(e.error.message);
      }
    });
  }
}
