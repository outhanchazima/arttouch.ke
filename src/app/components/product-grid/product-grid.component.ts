import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Product, ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shop</h2>
          <div class="flex items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>Shop</span>
          </div>
        </div>

        <!-- Filter Bar -->
        <div
          class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10 pb-6 border-b border-slate-100"
        >
          <!-- Left: Filters -->
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span class="text-slate-500 font-medium">Filter by</span>

            <div class="flex flex-wrap items-center gap-6">
              <button
                class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Color
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Size
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Brand
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Price
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Right: Sorting & Layout -->
          <div class="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <button
              class="flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
            >
              Default Sorting
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div class="flex items-center gap-2 border-l border-slate-200 pl-6">
              <button class="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button class="p-2 text-slate-900 bg-slate-100 rounded transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button class="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (product of products(); track product.id) {
          <app-product-card [product]="product" />
          }
        </div>

        <div class="mt-12 text-center md:hidden">
          <button
            class="px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ProductGridComponent {
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Abstract Harmony #1',
      price: 120,
      image: 'https://picsum.photos/seed/art1/400/500',
      category: 'Digital Art',
      rating: 4.9,
      colors: ['#3B82F6', '#EF4444', '#10B981'],
    },
    {
      id: 2,
      name: 'Neon Dreams',
      price: 250,
      image: 'https://picsum.photos/seed/art2/400/500',
      category: 'Photography',
      rating: 4.7,
      colors: ['#8B5CF6', '#EC4899'],
    },
    {
      id: 3,
      name: 'Geometric Flow',
      price: 85,
      image: 'https://picsum.photos/seed/art3/400/500',
      category: 'Print',
      rating: 4.5,
      colors: ['#F59E0B', '#3B82F6'],
    },
    {
      id: 4,
      name: 'Urban Solitude',
      price: 180,
      image: 'https://picsum.photos/seed/art4/400/500',
      category: 'Oil Painting',
      rating: 5.0,
    },
    {
      id: 5,
      name: 'Chromatic Waves',
      price: 300,
      image: 'https://picsum.photos/seed/art5/400/500',
      category: 'Acrylic',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Minimalist Horizon',
      price: 95,
      image: 'https://picsum.photos/seed/art6/400/500',
      category: 'Print',
      rating: 4.6,
    },
    {
      id: 7,
      name: 'Retro Future',
      price: 150,
      image: 'https://picsum.photos/seed/art7/400/500',
      category: 'Digital Art',
      rating: 4.9,
    },
    {
      id: 8,
      name: "Nature's Whisper",
      price: 210,
      image: 'https://picsum.photos/seed/art8/400/500',
      category: 'Photography',
      rating: 4.7,
    },
  ]);
}
