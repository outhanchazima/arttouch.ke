import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { InputDirective } from '../../shared/ui/input/input.directive';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ContainerComponent, FormFieldComponent, InputDirective, ButtonComponent],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Get In Touch</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            We'd Love to Hear From You
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            Have questions about our products or services? Reach out and our team will get back to you within 24 hours.
          </p>
        </div>
      </app-container>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Form -->
          <div class="bg-white p-8 md:p-12 border border-gray-100">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8">Send Us a Message</h2>
            
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <app-form-field label="Full Name" for="name">
                  <input
                    id="name"
                    type="text"
                    appInput
                    [(ngModel)]="form.name"
                    name="name"
                    placeholder="Your name"
                  />
                </app-form-field>

                <app-form-field label="Email Address" for="email">
                  <input
                    id="email"
                    type="email"
                    appInput
                    [(ngModel)]="form.email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </app-form-field>
              </div>

              <app-form-field label="Subject" for="subject">
                <input
                  id="subject"
                  type="text"
                  appInput
                  [(ngModel)]="form.subject"
                  name="subject"
                  placeholder="How can we help?"
                />
              </app-form-field>

              <app-form-field label="Message" for="message">
                <textarea
                  id="message"
                  [(ngModel)]="form.message"
                  name="message"
                  rows="5"
                  placeholder="Tell us more..."
                  class="w-full px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all resize-none placeholder:text-gray-400"
                ></textarea>
              </app-form-field>

              <app-button type="submit" [fullWidth]="true" [disabled]="isSubmitting()">
                @if (isSubmitting()) { Sending... } @else { Send Message }
              </app-button>

              @if (submitted()) {
              <p class="text-green-600 text-sm text-center">Thank you! We'll get back to you soon.</p>
              }
            </form>
          </div>

          <!-- Info -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8">Contact Information</h2>
              <p class="text-gray-500 mb-8">
                Visit us at our office or reach out through any of the channels below. We're here to help!
              </p>
            </div>

            <div class="space-y-6">
              @for (info of contactInfo; track info.label) {
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-gray-100 flex items-center justify-center text-xl shrink-0">
                  {{ info.icon }}
                </div>
                <div>
                  <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{{ info.label }}</span>
                  <p class="text-gray-900 font-medium">{{ info.value }}</p>
                  @if (info.secondary) {
                  <p class="text-gray-500 text-sm">{{ info.secondary }}</p>
                  }
                </div>
              </div>
              }
            </div>

            <!-- Business Hours -->
            <div class="bg-gray-100 p-8 mt-8">
              <h3 class="font-bold text-gray-900 mb-4">Business Hours</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Monday - Friday</span>
                  <span class="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Saturday</span>
                  <span class="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Sunday</span>
                  <span class="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Map Placeholder -->
    <section class="bg-gray-200 h-80">
      <div class="w-full h-full flex items-center justify-center text-gray-500">
        <div class="text-center">
          <span class="text-4xl block mb-2">📍</span>
          <p class="text-sm">Map integration coming soon</p>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = signal(false);
  submitted = signal(false);

  contactInfo = [
    {
      icon: '📍',
      label: 'Address',
      value: 'Annex Jacaranda Road, Eldoret',
      secondary: 'Kenya',
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+254 723 709 005',
      secondary: 'Mon-Sat, 8am-6pm EAT',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'info@arttouchke.com',
      secondary: 'We reply within 24 hours',
    },
  ];

  onSubmit() {
    this.isSubmitting.set(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.form);
      this.isSubmitting.set(false);
      this.submitted.set(true);
      this.form = { name: '', email: '', subject: '', message: '' };
      
      setTimeout(() => this.submitted.set(false), 5000);
    }, 1000);
  }
}
