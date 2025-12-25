import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { InputDirective } from '../../shared/ui/input/input.directive';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Service, ServiceRequest, ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-service-detail',
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    RouterLink,
    FormFieldComponent,
    InputDirective,
    ButtonComponent,
  ],
  template: `
    @if (service()) {
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <a routerLink="/services" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </a>
            <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">{{ service()!.title }}</span>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {{ getHeroTitle() }}
            </h1>
            <p class="text-gray-500 text-lg leading-relaxed mb-8">
              {{ service()!.description }}
            </p>
            <a 
              href="#request-form"
              class="inline-block px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              Request This Service
            </a>
          </div>
          <div class="aspect-4/3 overflow-hidden">
            <img 
              [src]="service()!.image" 
              [alt]="service()!.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </app-container>
    </section>

    <!-- Features & Benefits -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Features -->
          <div class="bg-white p-8 md:p-12 border border-gray-100">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8">What's Included</h2>
            <ul class="space-y-4">
              @for (feature of service()!.features; track feature) {
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-600">{{ feature }}</span>
              </li>
              }
            </ul>
          </div>

          <!-- Benefits -->
          <div class="bg-white p-8 md:p-12 border border-gray-100">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-8">Why Choose This Service</h2>
            <ul class="space-y-4">
              @for (benefit of service()!.benefits; track benefit) {
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-600">{{ benefit }}</span>
              </li>
              }
            </ul>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Request Form -->
    <section id="request-form" class="py-20 bg-white scroll-mt-20">
      <app-container>
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Get Started</span>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">
              Request {{ service()!.title }} Service
            </h2>
            <p class="text-gray-500">
              Fill out the form below and we'll get back to you within 24 hours with a customized quote.
            </p>
          </div>

          @if (submitted()) {
          <div class="bg-green-50 border border-green-200 p-8 text-center">
            <svg class="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p class="text-gray-600 mb-2">{{ successMessage() }}</p>
            <p class="text-sm text-gray-500">Reference: <strong>{{ referenceNumber() }}</strong></p>
          </div>
          } @else {
          <form (ngSubmit)="onSubmit()" class="bg-gray-50 p-8 md:p-12 border border-gray-100">
            <!-- Contact Info -->
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <app-form-field label="Full Name *" for="name">
                  <input
                    id="name"
                    type="text"
                    appInput
                    [(ngModel)]="form.name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </app-form-field>

                <app-form-field label="Email Address *" for="email">
                  <input
                    id="email"
                    type="email"
                    appInput
                    [(ngModel)]="form.email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </app-form-field>

                <app-form-field label="Phone Number *" for="phone">
                  <input
                    id="phone"
                    type="tel"
                    appInput
                    [(ngModel)]="form.phone"
                    name="phone"
                    placeholder="+254 712 345 678"
                    required
                  />
                </app-form-field>

                <app-form-field label="Organization (Optional)" for="organization">
                  <input
                    id="organization"
                    type="text"
                    appInput
                    [(ngModel)]="form.organization"
                    name="organization"
                    placeholder="School or organization name"
                  />
                </app-form-field>
              </div>
            </div>

            <!-- Order Details -->
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Order Details</h3>
              
              <app-form-field label="Describe Your Requirements *" for="description" class="mb-6">
                <textarea
                  id="description"
                  [(ngModel)]="form.description"
                  name="description"
                  rows="4"
                  placeholder="Tell us about your needs, including specific products, age groups, quantities, etc."
                  class="w-full px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all resize-none placeholder:text-gray-400"
                  required
                ></textarea>
              </app-form-field>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <app-form-field label="Estimated Quantity" for="quantity">
                  <input
                    id="quantity"
                    type="number"
                    appInput
                    [(ngModel)]="form.quantity"
                    name="quantity"
                    placeholder="e.g., 50"
                    min="1"
                  />
                </app-form-field>

                <app-form-field label="Budget Range" for="budget">
                  <select
                    id="budget"
                    [(ngModel)]="form.budget"
                    name="budget"
                    class="w-full px-4 py-2 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all"
                  >
                    <option value="">Select budget</option>
                    <option value="under-10k">Under KES 10,000</option>
                    <option value="10k-50k">KES 10,000 - 50,000</option>
                    <option value="50k-100k">KES 50,000 - 100,000</option>
                    <option value="100k-500k">KES 100,000 - 500,000</option>
                    <option value="over-500k">Over KES 500,000</option>
                  </select>
                </app-form-field>

                <app-form-field label="Timeline" for="timeline">
                  <select
                    id="timeline"
                    [(ngModel)]="form.timeline"
                    name="timeline"
                    class="w-full px-4 py-2 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Within 1 week</option>
                    <option value="soon">1-2 weeks</option>
                    <option value="normal">2-4 weeks</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </app-form-field>
              </div>
            </div>

            <!-- File Upload -->
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Attachments (Optional)</h3>
              <p class="text-sm text-gray-500 mb-4">
                Upload any relevant documents like purchase lists, curriculum requirements, or reference images.
              </p>
              
              <div 
                class="border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                (click)="fileInput.click()"
                (dragover)="onDragOver($event)"
                (drop)="onDrop($event)"
              >
                <input 
                  #fileInput
                  type="file" 
                  multiple 
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  (change)="onFileSelect($event)"
                  class="hidden"
                />
                <svg class="w-10 h-10 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p class="text-xs text-gray-400">PDF, JPG, PNG, DOC up to 10MB each</p>
              </div>

              @if (selectedFiles().length > 0) {
              <div class="mt-4 space-y-2">
                @for (file of selectedFiles(); track file.name) {
                <div class="flex items-center justify-between bg-gray-100 px-4 py-2">
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-sm text-gray-700">{{ file.name }}</span>
                    <span class="text-xs text-gray-400">({{ formatFileSize(file.size) }})</span>
                  </div>
                  <button 
                    type="button"
                    (click)="removeFile(file)"
                    class="text-gray-400 hover:text-red-500"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                }
              </div>
              }
            </div>

            @if (error()) {
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
              {{ error() }}
            </div>
            }

            <app-button type="submit" [fullWidth]="true" [disabled]="isSubmitting() || !isFormValid()">
              @if (isSubmitting()) { Submitting Request... } @else { Submit Request }
            </app-button>
          </form>
          }
        </div>
      </app-container>
    </section>
    } @else {
    <!-- Not Found -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="text-center">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p class="text-gray-500 mb-8">The service you're looking for doesn't exist.</p>
          <a routerLink="/services" class="px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide">
            View All Services
          </a>
        </div>
      </app-container>
    </section>
    }
  `,
})
export class ServiceDetailComponent {
  private route = inject(ActivatedRoute);
  private serviceRequestService = inject(ServiceRequestService);

  service = signal<Service | undefined>(undefined);
  submitted = signal(false);
  successMessage = signal('');
  referenceNumber = signal('');
  selectedFiles = signal<File[]>([]);
  error = signal<string | null>(null);

  isSubmitting = this.serviceRequestService.submitting;

  form: Omit<ServiceRequest, 'serviceId' | 'files'> = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    description: '',
    quantity: undefined,
    budget: '',
    timeline: '',
  };

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        const service = this.serviceRequestService.getServiceById(id);
        this.service.set(service);
      }
    });
  }

  getHeroTitle(): string {
    const service = this.service();
    if (!service) return '';
    
    switch (service.id) {
      case 'school-supply':
        return 'Complete Educational Resources for Schools';
      case 'home-learning':
        return 'Bring Quality Learning Home';
      case 'special-needs':
        return 'Inclusive Resources for Every Child';
      default:
        return service.title;
    }
  }

  isFormValid(): boolean {
    return !!(this.form.name && this.form.email && this.form.phone && this.form.description);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  private addFiles(files: File[]): void {
    const validFiles = files.filter((file) => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    this.selectedFiles.update((current) => [...current, ...validFiles]);
  }

  removeFile(file: File): void {
    this.selectedFiles.update((current) => current.filter((f) => f !== file));
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  async onSubmit(): Promise<void> {
    if (!this.isFormValid() || !this.service()) return;

    this.error.set(null);

    const request: ServiceRequest = {
      serviceId: this.service()!.id,
      ...this.form,
      files: this.selectedFiles(),
    };

    const response = await this.serviceRequestService.submitRequest(request);

    if (response.success) {
      this.submitted.set(true);
      this.successMessage.set(response.message);
      this.referenceNumber.set(response.referenceNumber || '');
    } else {
      this.error.set(response.message);
    }
  }
}
