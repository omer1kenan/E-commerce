import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/users/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  isLoginMode: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    const authData = {
      username: this.authForm.get('username')?.value,
      password: this.authForm.get('password')?.value
    };

    this.userService.login(authData).subscribe(
      (response: any) => {
        console.log('Login successful!', response);
        localStorage.setItem('token', response.token);
        this.authService.login();
        this.router.navigate(['dashboard/carts']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (!this.isLoginMode) {
      this.authForm.get('confirmPassword')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('confirmPassword')?.clearValidators();
    }
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }
}
