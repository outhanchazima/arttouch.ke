import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent, Product } from '../product-card/product-card.component';

@Component({
    selector: 'app-product-grid',
    standalone: true,
    imports: [CommonModule, ProductCardComponent],
    template: `
    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Collection</h2>
            <p class="text-slate-600 max-w-xl">Explore our latest arrivals and most popular artworks, curated just for you.</p>
          </div>
          <button class="hidden md:block text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2 group">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" (addToCart)="onAddToCart($event)" />
          }
        </div>
        
        <div class="mt-12 text-center md:hidden">
           <button class="px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  `
})
export class ProductGridComponent {
    products = signal<Product[]>([
        {
            id: 1,
            name: 'Abstract Harmony #1',
            price: 120,
            image: 'https://picsum.photos/seed/art1/400/500',
            category: 'Digital Art',
            rating: 4.9
        },
        {
            id: 2,
            name: 'Neon Dreams',
            price: 250,
            image: 'https://picsum.photos/seed/art2/400/500',
            category: 'Photography',
            rating: 4.7
        },
        {
            id: 3,
            name: 'Geometric Flow',
            price: 85,
            image: 'https://picsum.photos/seed/art3/400/500',
            category: 'Print',
            rating: 4.5
        },
        {
            id: 4,
            name: 'Urban Solitude',
            price: 180,
            image: 'https://picsum.photos/seed/art4/400/500',
            category: 'Oil Painting',
            rating: 5.0
        },
        {
            id: 5,
            name: 'Chromatic Waves',
            price: 300,
            image: 'https://picsum.photos/seed/art5/400/500',
            category: 'Acrylic',
            rating: 4.8
        },
        {
            id: 6,
            name: 'Minimalist Horizon',
            price: 95,
            image: 'https://picsum.photos/seed/art6/400/500',
            category: 'Print',
            rating: 4.6
        },
        {
            id: 7,
            name: 'Retro Future',
            price: 150,
            image: 'https://picsum.photos/seed/art7/400/500',
            category: 'Digital Art',
            rating: 4.9
        },
        {
            id: 8,
            name: 'Nature\'s Whisper',
            price: 210,
            image: 'https://picsum.photos/seed/art8/400/500',
            category: 'Photography',
            rating: 4.7
        }
    ]);

    onAddToCart(product: Product) {
        console.log('Added to cart:', product);
        // In a real app, this would interact with a CartService
    }
}
