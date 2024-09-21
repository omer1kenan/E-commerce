import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedInSubject.asObservable();

  constructor(private router: Router) { this.checkLoginStatus(); }

  get currentLoginStatus() {
    return this.loggedInSubject.value;
  }

  login() {
    this.loggedInSubject.next(true);
  }

  logout() {
    this.loggedInSubject.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.loggedInSubject.next(!!token);
  }
}
