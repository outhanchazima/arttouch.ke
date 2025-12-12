import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { of, delay, tap, Observable, throwError, map } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // State
  private state = signal<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Selectors
  user = computed(() => this.state().user);
  isAuthenticated = computed(() => this.state().isAuthenticated);
  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('arttouch_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.state.update((s) => ({ ...s, user, isAuthenticated: true }));
        } catch (e) {
          localStorage.removeItem('arttouch_user');
        }
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    this.state.update((s) => ({ ...s, isLoading: true, error: null }));

    // Mock API call
    return of(null).pipe(
      delay(1000), // Simulate network delay
      map(() => {
        if (email === 'demo@arttouch.ke' && password === 'demo123') {
          const user: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@arttouch.ke',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
          };
          this.handleLoginSuccess(user);
          return user;
        } else {
          const error = 'Invalid email or password';
          this.state.update((s) => ({ ...s, isLoading: false, error }));
          throw new Error(error);
        }
      })
    );
  }

  loginWithOtp(email: string, otp: string): Observable<User> {
    this.state.update((s) => ({ ...s, isLoading: true, error: null }));

    return of(null).pipe(
      delay(1000),
      map(() => {
        if (email === 'demo@arttouch.ke' && otp === '123456') {
          const user: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@arttouch.ke',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
          };
          this.handleLoginSuccess(user);
          return user;
        } else {
          const error = 'Invalid OTP code';
          this.state.update((s) => ({ ...s, isLoading: false, error }));
          throw new Error(error);
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    this.state.update((s) => ({ ...s, isLoading: true, error: null }));

    return of(null).pipe(
      delay(1000),
      map(() => {
        // Simulate successful registration
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        };
        this.handleLoginSuccess(user);
        return user;
      })
    );
  }

  logout() {
    this.state.set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('arttouch_user');
    }
    
    this.router.navigate(['/login']);
  }

  private handleLoginSuccess(user: User) {
    this.state.update((s) => ({
      ...s,
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }));

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('arttouch_user', JSON.stringify(user));
    }

    this.router.navigate(['/profile']);
  }
}
