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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  usernameControl!: FormControl;
  passwordControl!: FormControl;
  roleControl!: FormControl;
  registrationForm!: FormGroup;

  roles: string[] = [];

  constructor( private formBuilder: FormBuilder, private authService: AuthService
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
    console.log('register submitted');
    this.authService.register(this.registrationForm.value)
  }
}
