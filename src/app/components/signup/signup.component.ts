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
  selector: 'app-signup',
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
            <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">Create Account</h2>
            <p class="mt-2 text-sm text-gray-500">
              Join ArtTouch to discover and collect unique art
            </p>
          </div>

          <!-- Form -->
          <form class="space-y-6" (submit)="onSubmit($event)">
            <div class="space-y-4">
              <!-- Name -->
              <app-form-field
                label="Full Name"
                for="name"
                [errorMessage]="
                  signupForm.name().touched() && !signupForm.name().valid()
                    ? 'Full name is required'
                    : ''
                "
              >
                <input
                  id="name"
                  type="text"
                  appInput
                  [field]="signupForm.name"
                  [hasError]="signupForm.name().touched() && !signupForm.name().valid()"
                  placeholder="Enter your full name"
                />
              </app-form-field>

              <!-- Email -->
              <app-form-field
                label="Email Address"
                for="email"
                [errorMessage]="
                  signupForm.email().touched() && !signupForm.email().valid()
                    ? 'Please enter a valid email address'
                    : ''
                "
              >
                <input
                  id="email"
                  type="email"
                  appInput
                  [field]="signupForm.email"
                  [hasError]="signupForm.email().touched() && !signupForm.email().valid()"
                  placeholder="Enter your email address"
                />
              </app-form-field>

              <!-- Password -->
              <app-form-field
                label="Password"
                for="password"
                [errorMessage]="
                  signupForm.password().touched() && !signupForm.password().valid()
                    ? 'Password is required'
                    : ''
                "
              >
                <input
                  id="password"
                  type="password"
                  appInput
                  [field]="signupForm.password"
                  [hasError]="signupForm.password().touched() && !signupForm.password().valid()"
                  placeholder="Create a password"
                />
              </app-form-field>
            </div>

            <app-button type="submit" [disabled]="!isValid()" [fullWidth]="true">
              Sign Up
            </app-button>

            <div class="text-center text-sm">

              <span class="text-gray-500">Already have an account? </span>
              <a routerLink="/login" class="font-bold text-gray-900 hover:underline uppercase tracking-wide">
                Sign In
              </a>
            </div>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500 uppercase tracking-widest">or</span>
            </div>
          </div>

          <!-- Social Login -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-none bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-[#111] transition-all uppercase tracking-wide"
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
            Sign up with Google
          </button>
        </app-card>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupModel = signal({
    name: '',
    email: '',
    password: '',
  });

  signupForm = form(this.signupModel, (s) => {
    required(s.name);
    required(s.email);
    email(s.email);
    required(s.password);
  });

  isValid() {
    return (
      this.signupForm.name().valid() &&
      this.signupForm.email().valid() &&
      this.signupForm.password().valid()
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Signup submitted', this.signupModel());
  }
}
