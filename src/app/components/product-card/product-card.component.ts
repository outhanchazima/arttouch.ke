import { Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100">
      <!-- Image Container -->
      <div class="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
        <img 
          [src]="product().image" 
          [alt]="product().name"
          class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        
        <!-- Quick Action Overlay -->
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button (click)="addToCart.emit(product())" class="p-3 bg-white text-slate-900 rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button class="p-3 bg-white text-slate-900 rounded-full hover:bg-pink-600 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <!-- Badge -->
        @if (product().rating >= 4.8) {
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
            Top Rated
          </div>
        }
      </div>

      <!-- Content -->
      <div class="space-y-2">
        <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ product().category }}</p>
        <h3 class="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {{ product().name }}
        </h3>
        
        <div class="flex items-center justify-between">
          <p class="text-xl font-bold text-slate-900">
            \${{ product().price }}
          </p>
          <div class="flex items-center text-amber-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="ml-1 text-slate-500 font-medium">{{ product().rating }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
    product = input.required<Product>();
    addToCart = output<Product>();
}
