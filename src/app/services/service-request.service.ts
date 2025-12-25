import { Injectable, signal } from '@angular/core';

export interface ServiceRequest {
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  description: string;
  quantity?: number;
  budget?: string;
  timeline?: string;
  files?: File[];
}

export interface ServiceRequestResponse {
  success: boolean;
  message: string;
  referenceNumber?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestService {
  private isSubmitting = signal(false);
  private lastError = signal<string | null>(null);

  readonly submitting = this.isSubmitting.asReadonly();
  readonly error = this.lastError.asReadonly();

  private services: Service[] = [
    {
      id: 'school-supply',
      title: 'School Supply',
      shortDescription: 'Complete educational resource packages for ECDE and primary schools.',
      description: 'We provide comprehensive educational resource packages tailored for Early Childhood Development Education (ECDE) centers and primary schools. From Montessori materials to classroom essentials, we help schools create engaging learning environments.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Bulk ordering with competitive pricing',
        'Customized packages for different age groups',
        'Delivery to schools across Kenya',
        'Training on resource usage available',
        'Ongoing support and restocking',
      ],
      benefits: [
        'Save time with curated resource bundles',
        'Quality materials that meet curriculum standards',
        'Dedicated account manager for schools',
        'Flexible payment options for institutions',
      ],
    },
    {
      id: 'home-learning',
      title: 'Home Learning',
      shortDescription: 'Curated learning kits and resources for home-based education.',
      description: 'Support your child\'s development at home with our carefully curated learning kits. Whether you\'re homeschooling or supplementing classroom learning, we provide age-appropriate resources that make learning fun and effective.',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Age-appropriate learning kits (0-8 years)',
        'Montessori-inspired materials',
        'Activity guides included',
        'Monthly subscription options',
        'Parent support resources',
      ],
      benefits: [
        'Expert-curated developmental activities',
        'Clear instructions for parents',
        'Track your child\'s progress',
        'Convenient home delivery',
      ],
    },
    {
      id: 'special-needs',
      title: 'Special Needs',
      shortDescription: 'Specialized resources for children with diverse learning needs.',
      description: 'We are committed to inclusive education. Our special needs program provides specialized sensory tools, adaptive learning materials, and therapeutic resources designed to support children with autism, ADHD, developmental delays, and other learning differences.',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Sensory processing tools',
        'Fine motor skill development kits',
        'Communication aids and visual schedules',
        'Consultation with specialists',
        'Customized resource packages',
      ],
      benefits: [
        'Resources designed by therapists',
        'Personalized recommendations',
        'Support for parents and caregivers',
        'Inclusive learning materials',
      ],
    },
  ];

  getServices(): Service[] {
    return this.services;
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find((s) => s.id === id);
  }

  async submitRequest(request: ServiceRequest): Promise<ServiceRequestResponse> {
    this.isSubmitting.set(true);
    this.lastError.set(null);

    try {
      // Simulate API call - replace with actual HTTP call
      await this.simulateApiCall(request);

      const referenceNumber = this.generateReferenceNumber();

      console.log('Service request submitted:', { ...request, referenceNumber });

      return {
        success: true,
        message: 'Your request has been submitted successfully. We will contact you within 24 hours.',
        referenceNumber,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      this.lastError.set(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async simulateApiCall(request: ServiceRequest): Promise<void> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // In production, this would be an HTTP POST to your backend
        // Example:
        // return this.http.post('/api/service-requests', formData).toPromise();
        resolve();
      }, 1500);
    });
  }

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SR-${timestamp}-${random}`;
  }

  // Helper to create FormData for file uploads
  createFormData(request: ServiceRequest): FormData {
    const formData = new FormData();

    formData.append('serviceId', request.serviceId);
    formData.append('name', request.name);
    formData.append('email', request.email);
    formData.append('phone', request.phone);
    formData.append('description', request.description);

    if (request.organization) {
      formData.append('organization', request.organization);
    }
    if (request.quantity) {
      formData.append('quantity', request.quantity.toString());
    }
    if (request.budget) {
      formData.append('budget', request.budget);
    }
    if (request.timeline) {
      formData.append('timeline', request.timeline);
    }

    // Append files
    if (request.files && request.files.length > 0) {
      request.files.forEach((file, index) => {
        formData.append(`file_${index}`, file, file.name);
      });
    }

    return formData;
  }
}
