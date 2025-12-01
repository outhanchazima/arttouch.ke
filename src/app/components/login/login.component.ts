import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email, Field, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Field],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-[#F9F9F7] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
      >
        <!-- Logo & Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
          <p class="mt-2 text-sm text-slate-500">
            Sign in to your ArtTouch account to access your personalized dashboard
          </p>
        </div>

        <!-- Login Method Toggle -->
        <div class="bg-slate-50 p-1 rounded-lg flex">
          <button
            (click)="loginMethod.set('password')"
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200"
            [class.bg-white]="loginMethod() === 'password'"
            [class.shadow-sm]="loginMethod() === 'password'"
            [class.text-slate-900]="loginMethod() === 'password'"
            [class.text-slate-500]="loginMethod() !== 'password'"
          >
            Password
          </button>
          <button
            (click)="loginMethod.set('otp')"
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200"
            [class.bg-white]="loginMethod() === 'otp'"
            [class.shadow-sm]="loginMethod() === 'otp'"
            [class.text-slate-900]="loginMethod() === 'otp'"
            [class.text-slate-500]="loginMethod() !== 'otp'"
          >
            OTP
          </button>
        </div>

        <!-- Form -->
        <form class="mt-8 space-y-6" (submit)="onSubmit($event)">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700 mb-1"
                >Email Address</label
              >
              <input
                id="email"
                type="email"
                [field]="loginForm.email"
                class="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                [class.border-red-500]="loginForm.email().touched() && !loginForm.email().valid()"
                placeholder="Enter your email address"
              />
              @if (loginForm.email().touched() && !loginForm.email().valid()) {
              <p class="mt-1 text-sm text-red-500">Please enter a valid email address</p>
              }
            </div>

            @if (loginMethod() === 'password') {
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 mb-1"
                >Password</label
              >
              <input
                id="password"
                type="password"
                [field]="loginForm.password"
                class="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                [class.border-red-500]="
                  loginForm.password().touched() && !loginForm.password().valid()
                "
                placeholder="Enter your password"
              />
              @if (loginForm.password().touched() && !loginForm.password().valid()) {
              <p class="mt-1 text-sm text-red-500">Password is required</p>
              }
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  [field]="loginForm.rememberMe"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-slate-500 hover:text-slate-900">
                  Forgot password?
                </a>
              </div>
            </div>
            } @else {
            <!-- OTP Input -->
            <div>
              <label for="otp" class="block text-sm font-medium text-slate-700 mb-1"
                >OTP Code</label
              >
              <input
                id="otp"
                type="text"
                [field]="loginForm.otp"
                class="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Enter OTP"
              />
            </div>
            }
          </div>

          <button
            type="submit"
            [disabled]="!isValid()"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loginMethod() === 'password' ? 'Sign In' : 'Send OTP' }}
          </button>

          <div class="text-center text-sm">
            <span class="text-slate-500">Don't have an account? </span>
            <a routerLink="/signup" class="font-medium text-slate-900 hover:underline"> Sign Up </a>
          </div>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <!-- Social Login -->
        <button
          type="button"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
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
    // Conditional validation isn't directly supported in the basic schema example,
    // but we can check validity manually or assume required for password if method is password
    // For now, let's just require password always in the schema, but we might ignore it in isValid() check
    required(s.password);
  });

  isValid() {
    const method = this.loginMethod();
    const emailValid = this.loginForm.email().valid();

    if (method === 'password') {
      return emailValid && this.loginForm.password().valid();
    } else {
      // For OTP, we just need email (to send OTP) or email + otp (to verify)
      // Assuming 'Send OTP' button just needs email
      return emailValid;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Login submitted', this.loginModel());
  }
}
