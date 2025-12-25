import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { ProductService } from '../../services/product.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ContainerComponent, RouterLink, BadgeComponent],
  template: `
    <!-- Hero Section -->
    <section class="pt-12 pb-20 bg-white">
      <app-container>
        <div class="text-center mb-12">
          <h1 class="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-4">
            Empowering<br />
            Young Minds
          </h1>
          <p class="max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
            Ignite curiosity and foster development with our curated collection of Montessori and ECDE resources. We provide tools for every child's unique learning journey.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div class="aspect-3/4 bg-gray-100 overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop" alt="Learning 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
          <div class="aspect-3/4 bg-gray-100 overflow-hidden relative group mt-0 md:mt-12">
            <img src="https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop" alt="Learning 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
          <div class="aspect-3/4 bg-gray-100 overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1596464716127-f9a8759fa069?q=80&w=1000&auto=format&fit=crop" alt="Learning 3" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
        </div>
      </app-container>
    </section>

    <!-- New Arrivals Section -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div class="max-w-md">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 relative inline-block">
              Latest in Learning<br />Innovation
              <span class="absolute -top-2 -right-4 text-orange-400 text-2xl">✦</span>
            </h2>
          </div>
          <div class="flex flex-col items-end gap-4">
            <p class="text-gray-500 text-sm max-w-xs text-right">
              Discover our newest additions designed to support early childhood development and inclusive learning for all abilities.
            </p>
            <a routerLink="/products" class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Show all collection <span>↗</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (product of newArrivals(); track product.id) {
            <div class="group cursor-pointer">
              <div class="relative aspect-3/4 bg-gray-100 mb-4 overflow-hidden">
                <app-badge variant="new" size="sm" class="absolute top-4 left-4 z-10">New</app-badge>
                <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              </div>
              <h3 class="font-medium text-gray-900 mb-1">{{ product.name }}</h3>
              <p class="text-gray-900 font-bold">\${{ product.price }}</p>
            </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Daily Styles Banner -->
    <section class="py-20 bg-gray-50 overflow-hidden">
      <app-container>
        <div class="relative h-[400px] md:h-[500px] flex items-center justify-center">
          <!-- Background Text -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span class="text-[15rem] md:text-[25rem] font-bold text-white leading-none tracking-tighter">PLAY</span>
          </div>
          
          <!-- Content -->
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div class="text-center md:text-right">
              <span class="text-orange-500 font-medium">Sensory Toys</span>
            </div>
            
            <div class="relative w-64 md:w-80 aspect-3/4">
              <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop" alt="Playful Learning" class="w-full h-full object-cover shadow-2xl rotate-3">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <h2 class="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">
                  Playful<br />Learning
                </h2>
              </div>
            </div>

            <div class="text-center md:text-left max-w-xs">
              <span class="text-orange-500 font-medium block mb-2">Montessori Kits</span>
              <p class="text-gray-600 text-sm">Explore our collection to prepare your child's daily learning adventure.</p>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Previous Collection -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 relative inline-block">
            Essential Classroom<br />Resources
            <span class="absolute -top-2 -right-4 text-orange-400 text-2xl">✦</span>
          </h2>
          <div class="flex flex-col items-end gap-4 mt-6 md:mt-0">
            <p class="text-gray-500 text-sm max-w-xs text-right">
              Foundational materials for every ECDE classroom. We provide lasting quality for schools and homes.
            </p>
            <a routerLink="/products" class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Show all collection <span>↗</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="group cursor-pointer">
            <div class="aspect-4/3 bg-gray-100 overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" alt="Classroom" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            </div>
            <h3 class="font-medium text-gray-900">Classroom Essentials</h3>
          </div>
          <div class="group cursor-pointer">
            <div class="aspect-4/3 bg-gray-100 overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop" alt="Home Learning" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            </div>
            <h3 class="font-medium text-gray-900">Home Learning Kits</h3>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Product Highlight -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Controls -->
          <div class="hidden lg:flex lg:col-span-1 flex-col gap-8 items-center text-xs font-medium text-gray-400">
            <span>01</span>
            <div class="h-16 w-px bg-gray-300"></div>
            <span>02</span>
            <span>03</span>
          </div>

          <!-- Main Image -->
          <div class="lg:col-span-5 mb-16 lg:mb-0">
            <div class="aspect-3/4 bg-white p-4 shadow-xl relative">
              <app-badge variant="featured" class="absolute top-4 right-4 z-10">Featured</app-badge>
              <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop" alt="Highlight" class="w-full h-full object-cover">
              
              <!-- Thumbnails -->
              <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-row gap-4 lg:flex-col lg:-right-16 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:left-auto lg:translate-x-0">
                <div class="w-12 h-16 bg-white shadow-md p-1 cursor-pointer hover:scale-110 transition-transform">
                  <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover">
                </div>
                <div class="w-12 h-16 bg-white shadow-md p-1 cursor-pointer hover:scale-110 transition-transform">
                  <img src="https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover">
                </div>
                <div class="w-12 h-16 bg-white shadow-md p-1 cursor-pointer hover:scale-110 transition-transform">
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="lg:col-span-6 lg:pl-12">
            <span class="text-orange-500 text-sm font-medium mb-2 block">Special Needs Collection ✦</span>
            <h2 class="text-4xl font-serif font-bold text-gray-900 mb-4">Inclusive Learning Kit</h2>
            <p class="text-gray-500 mb-6 max-w-md">
              Designed to support children with diverse learning needs. This kit focuses on sensory development and fine motor skills.
            </p>
            
            <div class="flex items-center gap-4 mb-8">
              <span class="text-gray-400 line-through text-lg">$150</span>
              <span class="text-3xl font-bold text-gray-900">$120</span>
            </div>

            <div class="mb-8">
              <p class="text-xs font-bold uppercase tracking-wider mb-3">Development Focus</p>
              <div class="flex gap-3">
                <span class="px-3 py-1 border border-gray-300 text-xs font-medium rounded-full">Sensory</span>
                <span class="px-3 py-1 border border-gray-300 text-xs font-medium rounded-full">Motor Skills</span>
                <span class="px-3 py-1 border border-gray-300 text-xs font-medium rounded-full">Cognitive</span>
              </div>
            </div>

            <div class="flex gap-4">
              <button class="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button class="px-8 py-3 border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Lookbook -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 relative inline-block">
            Learning Environments
            <span class="absolute -top-2 -right-4 text-orange-400 text-2xl">✦</span>
          </h2>
          <div class="flex flex-col items-end gap-4 mt-6 md:mt-0">
            <p class="text-gray-500 text-sm max-w-xs text-right">
              See how our resources transform spaces into hubs of creativity and learning.
            </p>
            <a routerLink="/products" class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
              View Gallery <span>↗</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group cursor-pointer">
            <div class="aspect-square bg-gray-100 relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
              <div class="absolute bottom-8 left-0 bg-white/90 backdrop-blur px-6 py-3">
                <span class="font-serif text-xl font-bold">Classroom</span>
              </div>
            </div>
            <h3 class="text-sm font-medium text-gray-600">School Setup</h3>
          </div>

          <!-- Card 2 -->
          <div class="group cursor-pointer">
            <div class="aspect-square bg-blue-900 relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover mix-blend-overlay opacity-70">
              <div class="absolute inset-0 flex items-center justify-center">
                <h3 class="text-4xl font-serif font-bold text-white text-center leading-tight">HOME<br>LEARNING</h3>
              </div>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-right">
                <span class="text-white text-xs tracking-widest uppercase">Montessori at Home</span>
              </div>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Home Environment</h3>
          </div>

          <!-- Card 3 -->
          <div class="group cursor-pointer">
            <div class="aspect-square bg-gray-100 relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
              <div class="absolute right-8 bottom-0 bg-white h-3/4 w-12 flex items-center justify-center border border-gray-200">
                <span class="text-black -rotate-90 whitespace-nowrap text-xs tracking-widest uppercase">Therapy Room</span>
              </div>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Special Needs Support</h3>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="flex flex-col md:flex-row justify-between items-start mb-16">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 max-w-xs">
            Trusted by<br />Educators & Parents <span class="text-orange-400">✦</span>
          </h2>
          <p class="text-gray-500 text-sm max-w-xs mt-4 md:mt-0">
            Hear from our community of teachers and parents who trust ArtTouch for their educational needs.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of testimonials; track testimonial.name) {
            <div class="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <span class="text-orange-500 text-4xl font-serif leading-none">“</span>
              <p class="text-gray-600 text-sm italic mb-6 mt-2 min-h-20">
                {{ testimonial.text }}
              </p>
              <div class="flex text-yellow-400 text-sm mb-6">
                ★★★★★
              </div>
              <div class="flex items-center gap-4">
                <img [src]="testimonial.image" [alt]="testimonial.name" class="w-10 h-10 rounded-full object-cover">
                <div>
                  <h4 class="font-bold text-sm text-gray-900">{{ testimonial.name }}</h4>
                  <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Community -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="aspect-4/5 relative bg-gray-100">
            <img src="https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover" alt="Community">
          </div>
          <div class="flex flex-col justify-center pl-0 md:pl-12">
            <div class="flex items-start gap-4 mb-6">
                <div class="w-1 h-12 bg-orange-300"></div>
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                  Join the ArtTouch Family <span class="text-orange-400 text-2xl align-top">✦</span>
                </h2>
            </div>
            
            <p class="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
              Join our community to receive updates on new educational resources, parenting tips, and exclusive offers.
            </p>
            
            <div class="flex gap-4 max-w-md">
              <input type="email" placeholder="Add your email here" class="flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 placeholder-gray-400">
              <button class="px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </app-container>
    </section>
  `
})
export class HomeComponent {
  private productService = inject(ProductService);
  
  // Get first 4 products for New Arrivals
  readonly newArrivals = signal(this.productService.getProducts()().slice(0, 4));

  readonly testimonials = [
    {
      text: "The Montessori kits from ArtTouch have completely transformed our home learning environment. My son is so engaged!",
      name: "Sarah M.",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      text: "As an ECDE teacher, finding durable and educational resources is tough. ArtTouch delivers quality every time.",
      name: "David K.",
      role: "ECDE Teacher",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    },
    {
      text: "I love the inclusive range of toys. It's rare to find a store that caters so well to special needs children.",
      name: "Emily R.",
      role: "Occupational Therapist",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop"
    }
  ];
}

