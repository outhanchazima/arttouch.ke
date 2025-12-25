import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email, Field, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { InputDirective } from '../../shared/ui/input/input.directive';
import { OtpInputComponent } from '../../shared/ui/otp-input/otp-input.component';

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
    OtpInputComponent,
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
              (click)="switchToPassword()"
              class="flex-1 py-2 text-sm font-medium rounded-none transition-all duration-300"
              [class.bg-[#111]]="loginMethod() === 'password'"
              [class.text-white]="loginMethod() === 'password'"
              [class.text-gray-500]="loginMethod() !== 'password'"
              [class.hover:text-gray-900]="loginMethod() !== 'password'"
            >
              Password
            </button>
            <button
              (click)="switchToOtp()"
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
              <!-- Email (shown when not in OTP verify step) -->
              @if (!otpSent()) {
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
              }

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
              <!-- OTP Flow -->
              @if (otpSent()) {
              <!-- OTP Verify Step -->
              <div class="space-y-4">
                <div class="text-center mb-4">
                  <p class="text-sm text-gray-600">
                    We've sent a 6-digit code to
                  </p>
                  <p class="font-medium text-gray-900">{{ loginModel().email }}</p>
                </div>

                <app-form-field label="Enter OTP Code">
                  <app-otp-input 
                    #otpInputRef
                    [(value)]="otpValue" 
                    [hasError]="otpError()"
                  />
                </app-form-field>

                @if (otpError()) {
                <p class="text-sm text-red-500 text-center">Invalid OTP. Please try again.</p>
                }

                <button 
                  type="button"
                  (click)="resendOtp()"
                  class="w-full text-center text-sm text-gray-500 hover:text-gray-900 underline-offset-4 hover:underline"
                  [disabled]="resendCooldown() > 0"
                >
                  @if (resendCooldown() > 0) {
                    Resend in {{ resendCooldown() }}s
                  } @else {
                    Resend OTP
                  }
                </button>
              </div>
              }
              }
            </div>

            <app-button type="submit" [disabled]="!isValid()" [fullWidth]="true">
              @if (loginMethod() === 'password') {
                Sign In
              } @else if (otpSent()) {
                Verify OTP
              } @else {
                Send OTP
              }
            </app-button>

            @if (otpSent()) {
            <button 
              type="button"
              (click)="backToEmail()"
              class="w-full text-center text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back to email
            </button>
            }

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
  @ViewChild('otpInputRef') otpInputRef?: OtpInputComponent;

  loginMethod = signal<'password' | 'otp'>('password');
  otpSent = signal(false);
  otpValue = signal('');
  otpError = signal(false);
  resendCooldown = signal(0);

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

  switchToPassword() {
    this.loginMethod.set('password');
    this.otpSent.set(false);
    this.otpValue.set('');
    this.otpError.set(false);
  }

  switchToOtp() {
    this.loginMethod.set('otp');
    this.otpSent.set(false);
    this.otpValue.set('');
    this.otpError.set(false);
  }

  backToEmail() {
    this.otpSent.set(false);
    this.otpValue.set('');
    this.otpError.set(false);
  }

  isValid() {
    const method = this.loginMethod();
    const emailValid = this.loginForm.email().valid();

    if (method === 'password') {
      return emailValid && this.loginForm.password().valid();
    } else {
      if (this.otpSent()) {
        return this.otpValue().length === 6;
      }
      return emailValid;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginMethod() === 'otp') {
      if (!this.otpSent()) {
        // Send OTP
        this.sendOtp();
      } else {
        // Verify OTP
        this.verifyOtp();
      }
    } else {
      // Password login
      console.log('Password login submitted', this.loginModel());
    }
  }

  sendOtp() {
    console.log('Sending OTP to', this.loginModel().email);
    this.otpSent.set(true);
    this.startResendCooldown();
    
    // Focus the OTP input after a short delay
    setTimeout(() => {
      this.otpInputRef?.focus();
    }, 100);
  }

  verifyOtp() {
    const otp = this.otpValue();
    console.log('Verifying OTP:', otp);
    
    // Simulate OTP verification (replace with actual API call)
    if (otp === '123456') {
      console.log('OTP verified successfully!');
      this.otpError.set(false);
    } else {
      this.otpError.set(true);
      this.otpInputRef?.clear();
    }
  }

  resendOtp() {
    if (this.resendCooldown() > 0) return;
    
    console.log('Resending OTP to', this.loginModel().email);
    this.startResendCooldown();
    this.otpInputRef?.clear();
  }

  private startResendCooldown() {
    this.resendCooldown.set(30);
    const interval = setInterval(() => {
      this.resendCooldown.update((v) => {
        if (v <= 1) {
          clearInterval(interval);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }
}
