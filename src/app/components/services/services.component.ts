import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">What We Offer</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            From school supply packages to specialized resources for children with special needs, we provide comprehensive educational solutions.
          </p>
        </div>
      </app-container>
    </section>

    <!-- Services Grid -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (service of services; track service.id) {
          <div class="bg-white border border-gray-100 group hover:shadow-lg transition-shadow">
            <div class="aspect-video overflow-hidden">
              <img 
                [src]="service.image" 
                [alt]="service.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
            </div>
            <div class="p-8">
              <h3 class="text-xl font-serif font-bold text-gray-900 mb-3">{{ service.title }}</h3>
              <p class="text-gray-500 text-sm mb-6 leading-relaxed">{{ service.shortDescription }}</p>
              <a 
                [routerLink]="['/services', service.id]"
                class="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-orange-500 transition-colors uppercase tracking-wide"
              >
                Learn More
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Why Choose ArtTouch? <span class="text-orange-400">✦</span>
          </h2>
          <p class="text-gray-500 max-w-xl mx-auto">
            We go beyond just selling products—we partner with you to create the best learning environment.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (benefit of benefits; track benefit.title) {
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4 text-2xl">
              {{ benefit.icon }}
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h4>
            <p class="text-gray-500 text-sm">{{ benefit.description }}</p>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-[#111] text-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Transform Your Learning Environment?
          </h2>
          <p class="text-gray-400 mb-8">
            Contact us today for a personalized consultation and free quote.
          </p>
          <a 
            routerLink="/contact"
            class="inline-block px-8 py-3 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-wide"
          >
            Get Started
          </a>
        </div>
      </app-container>
    </section>
  `,
})
export class ServicesComponent {
  private serviceRequestService = inject(ServiceRequestService);

  services = this.serviceRequestService.getServices();

  benefits = [
    {
      icon: '🎯',
      title: 'Expert Curation',
      description: 'Resources selected by education professionals.',
    },
    {
      icon: '📦',
      title: 'Bulk Discounts',
      description: 'Special pricing for schools and institutions.',
    },
    {
      icon: '🚚',
      title: 'Nationwide Delivery',
      description: 'Fast, reliable delivery across Kenya.',
    },
    {
      icon: '💬',
      title: 'Ongoing Support',
      description: 'Dedicated support for all your needs.',
    },
  ];
}
