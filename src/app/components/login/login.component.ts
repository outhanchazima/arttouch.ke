import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email, Field, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { InputDirective } from '../../shared/ui/input/input.directive';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    Field,
    ButtonComponent,
    CardComponent,
    FormFieldComponent,
    InputDirective,
  ],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full">
        <app-card>
          <!-- Logo & Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p class="mt-2 text-sm text-gray-500">
              Sign in to your ArtTouch account to access your personalized dashboard
            </p>
          </div>

          <!-- Login Method Toggle -->
          <div class="bg-gray-100 p-1 rounded-none flex mb-8">
            <button
              (click)="loginMethod.set('password')"
              class="flex-1 py-2 text-sm font-medium rounded-none transition-all duration-300"
              [class.bg-[#111]]="loginMethod() === 'password'"
              [class.text-white]="loginMethod() === 'password'"
              [class.text-gray-500]="loginMethod() !== 'password'"
              [class.hover:text-gray-900]="loginMethod() !== 'password'"
            >
              Password
            </button>
            <button
              (click)="loginMethod.set('otp')"
              class="flex-1 py-2 text-sm font-medium rounded-none transition-all duration-300"
              [class.bg-[#111]]="loginMethod() === 'otp'"
              [class.text-white]="loginMethod() === 'otp'"
              [class.text-gray-500]="loginMethod() !== 'otp'"
              [class.hover:text-gray-900]="loginMethod() !== 'otp'"
            >
              OTP
            </button>
          </div>

          <!-- Form -->
          <form class="space-y-6" (submit)="onSubmit($event)">
            <div class="space-y-4">
              <!-- Email -->
              <app-form-field
                label="Email Address"
                for="email"
                [errorMessage]="
                  loginForm.email().touched() && !loginForm.email().valid()
                    ? 'Please enter a valid email address'
                    : ''
                "
              >
                <input
                  id="email"
                  type="email"
                  appInput
                  [field]="loginForm.email"
                  [hasError]="loginForm.email().touched() && !loginForm.email().valid()"
                  placeholder="Enter your email address"
                />
              </app-form-field>

              @if (loginMethod() === 'password') {
              <!-- Password -->
              <app-form-field
                label="Password"
                for="password"
                [errorMessage]="
                  loginForm.password().touched() && !loginForm.password().valid()
                    ? 'Password is required'
                    : ''
                "
              >
                <input
                  id="password"
                  type="password"
                  appInput
                  [field]="loginForm.password"
                  [hasError]="loginForm.password().touched() && !loginForm.password().valid()"
                  placeholder="Enter your password"
                />
              </app-form-field>

                <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    [field]="loginForm.rememberMe"
                    class="h-4 w-4 text-[#111] focus:ring-[#111] border-gray-300 rounded-none bg-gray-50"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-gray-500 hover:text-gray-900 underline-offset-4 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              } @else {
              <!-- OTP Input -->
              <app-form-field label="OTP Code" for="otp">
                <input
                  id="otp"
                  type="text"
                  appInput
                  [field]="loginForm.otp"
                  placeholder="Enter OTP"
                />
              </app-form-field>
              }
            </div>

            <app-button type="submit" [disabled]="!isValid()" [fullWidth]="true">
              {{ loginMethod() === 'password' ? 'Sign In' : 'Send OTP' }}
            </app-button>

            <div class="text-center text-sm">
              <span class="text-gray-500">Don't have an account? </span>
              <a routerLink="/signup" class="font-bold text-gray-900 hover:underline uppercase tracking-wide text-xs">
                Sign Up
              </a>
            </div>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500 uppercase tracking-widest text-xs">or</span>
            </div>
          </div>

          <!-- Social Login -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-none bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-[#111] transition-all uppercase tracking-wide"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </app-card>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginMethod = signal<'password' | 'otp'>('password');

  loginModel = signal({
    email: '',
    password: '',
    otp: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel, (s) => {
    required(s.email);
    email(s.email);
    required(s.password);
  });

  isValid() {
    const method = this.loginMethod();
    const emailValid = this.loginForm.email().valid();

    if (method === 'password') {
      return emailValid && this.loginForm.password().valid();
    } else {
      return emailValid;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Login submitted', this.loginModel());
  }
}
