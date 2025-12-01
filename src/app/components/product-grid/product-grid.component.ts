import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FilterCriteria, ProductService } from '../../services/product.service';
import { ProductFiltersComponent } from '../filters/product-filters.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductFiltersComponent],
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
            <app-product-filters (filterChange)="onFilterChange($event)" />
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
  private productService = inject(ProductService);

  filterCriteria = signal<FilterCriteria>({
    categories: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
  });

  products = computed(() => {
    const allProducts = this.productService.getProducts()();
    const criteria = this.filterCriteria();
    return this.productService.filterProducts(allProducts, criteria);
  });

  onFilterChange(criteria: FilterCriteria) {
    this.filterCriteria.set(criteria);
  }
}
