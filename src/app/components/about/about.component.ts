import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-4xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">About Us</span>
          <h1 class="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Empowering Every Child's<br />Learning Journey
          </h1>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            At ArtTouch, we believe every child deserves access to quality educational resources that nurture curiosity, foster development, and celebrate their unique abilities.
          </p>
        </div>
      </app-container>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="aspect-4/3 bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" 
              alt="Children learning" 
              class="w-full h-full object-cover"
            >
          </div>
          <div>
            <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Our Story</span>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Founded with Purpose <span class="text-orange-400">✦</span>
            </h2>
            <p class="text-gray-500 mb-6 leading-relaxed">
              ArtTouch was born from a simple observation: quality educational resources should be accessible to all children, regardless of their learning needs or abilities. 
            </p>
            <p class="text-gray-500 mb-6 leading-relaxed">
              What started as a small initiative to provide Montessori materials to local schools has grown into a comprehensive platform serving educators, therapists, and parents across Kenya.
            </p>
            <p class="text-gray-500 leading-relaxed">
              Today, we partner with leading educational experts to curate and create resources that make a real difference in early childhood development.
            </p>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Mission & Vision -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="bg-gray-50 p-10 border-l-4 border-orange-500">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Our Mission</span>
            <h3 class="text-2xl font-serif font-bold text-gray-900 mb-4">
              To Transform Early Learning
            </h3>
            <p class="text-gray-500 leading-relaxed">
              We are committed to providing educators, parents, and therapists with innovative, high-quality educational resources that support every child's unique developmental journey—from sensory exploration to cognitive growth.
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-gray-50 p-10 border-l-4 border-[#111]">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Our Vision</span>
            <h3 class="text-2xl font-serif font-bold text-gray-900 mb-4">
              A World Where Every Child Thrives
            </h3>
            <p class="text-gray-500 leading-relaxed">
              We envision a future where inclusive, developmentally appropriate education is the norm—where every child, regardless of ability, has the tools they need to discover, learn, and grow to their fullest potential.
            </p>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Core Values -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="text-center mb-16">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">What We Stand For</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Our Core Values <span class="text-orange-400">✦</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (value of coreValues; track value.title) {
          <div class="bg-white p-8 border border-gray-100 hover:border-gray-200 transition-colors group">
            <div class="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mb-6 text-xl group-hover:bg-orange-500 transition-colors">
              {{ value.icon }}
            </div>
            <h4 class="font-bold text-gray-900 mb-3">{{ value.title }}</h4>
            <p class="text-gray-500 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="text-center mb-16">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">The People Behind ArtTouch</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Meet Our Team <span class="text-orange-400">✦</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (member of teamMembers; track member.name) {
          <div class="group text-center">
            <div class="aspect-square bg-gray-100 mb-6 overflow-hidden">
              <img 
                [src]="member.image" 
                [alt]="member.name"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              >
            </div>
            <h4 class="font-bold text-gray-900 mb-1">{{ member.name }}</h4>
            <p class="text-sm text-gray-500">{{ member.role }}</p>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-[#111] text-white">
      <app-container>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          @for (stat of stats; track stat.label) {
          <div>
            <span class="text-4xl md:text-5xl font-serif font-bold block mb-2">{{ stat.value }}</span>
            <span class="text-sm text-gray-400 uppercase tracking-wider">{{ stat.label }}</span>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Ready to Transform Learning?
          </h2>
          <p class="text-gray-500 mb-10 max-w-xl mx-auto">
            Explore our curated collection of educational resources designed to support every child's unique journey.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/store" class="px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide">
              Shop Now
            </a>
            <a routerLink="/" class="px-8 py-3 border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors uppercase tracking-wide">
              Learn More
            </a>
          </div>
        </div>
      </app-container>
    </section>
  `,
})
export class AboutComponent {
  coreValues = [
    {
      icon: '🎯',
      title: 'Inclusivity',
      description: 'Every child deserves access to quality education, regardless of their abilities or background.',
    },
    {
      icon: '✨',
      title: 'Quality',
      description: 'We partner with experts to ensure every product meets the highest educational standards.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously explore new approaches to make learning more engaging and effective.',
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We build meaningful relationships with educators, parents, and therapists to serve children better.',
    },
  ];

  teamMembers = [
    {
      name: 'Nashon Vugusu',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Outhan Chazima',
      role: 'Head of Design and Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Abigael Kaleha',
      role: 'Head of Education and Marketing',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Marion Wothaya',
      role: 'Head of Sales and Operations',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
    },
  ];

  stats = [
    { value: '5K+', label: 'Products Sold' },
    { value: '200+', label: 'Schools Served' },
    { value: '50+', label: 'Expert Partners' },
    { value: '10K+', label: 'Happy Families' },
  ];
}
