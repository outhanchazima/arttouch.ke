import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterCriteria, ProductService, SortOption } from '../../services/product.service';
import { ProductFiltersComponent } from '../filters/product-filters.component';
import { SortDropdownComponent } from '../filters/sort-dropdown.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductFiltersComponent,
    SortDropdownComponent,
    PaginationComponent,
  ],
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
          <div
            class="flex flex-wrap items-center gap-6 w-full lg:w-auto justify-between lg:justify-end"
          >
            <!-- Items Per Page -->
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <span>Show:</span>
              <select
                [ngModel]="itemsPerPage()"
                (ngModelChange)="onItemsPerPageChange($event)"
                class="bg-transparent border-none font-medium text-slate-900 focus:ring-0 cursor-pointer"
              >
                <option [value]="8">8</option>
                <option [value]="12">12</option>
                <option [value]="24">24</option>
              </select>
            </div>

            <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>

            <app-sort-dropdown [currentSort]="currentSort()" (sortChange)="onSortChange($event)" />
          </div>
        </div>

        <!-- Results Summary -->
        <div class="mb-6 text-sm text-slate-500">
          Showing <span class="font-medium text-slate-900">{{ startItemIndex() }}</span> -
          <span class="font-medium text-slate-900">{{ endItemIndex() }}</span> of
          <span class="font-medium text-slate-900">{{ totalItems() }}</span> results
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (product of paginatedProducts(); track product.id) {
          <app-product-card [product]="product" />
          }
        </div>

        <!-- Pagination -->
        @if (totalPages() > 1) {
        <app-pagination
          [currentPage]="currentPage()"
          [totalPages]="totalPages()"
          (pageChange)="onPageChange($event)"
        />
        }
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

  currentSort = signal<SortOption>('default');
  currentPage = signal(1);
  itemsPerPage = signal(8);

  // 1. Filtered Products
  filteredProducts = computed(() => {
    const allProducts = this.productService.getProducts()();
    const criteria = this.filterCriteria();
    return this.productService.filterProducts(allProducts, criteria);
  });

  // 2. Sorted Products
  sortedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const sortOption = this.currentSort();
    return this.productService.sortProducts(filtered, sortOption);
  });

  // 3. Paginated Products
  paginatedProducts = computed(() => {
    const sorted = this.sortedProducts();
    const page = this.currentPage();
    const limit = this.itemsPerPage();
    const start = (page - 1) * limit;
    return sorted.slice(start, start + limit);
  });

  // Metadata
  totalItems = computed(() => this.filteredProducts().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));

  startItemIndex = computed(() => {
    if (this.totalItems() === 0) return 0;
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });

  endItemIndex = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());
  });

  onFilterChange(criteria: FilterCriteria) {
    this.filterCriteria.set(criteria);
    this.currentPage.set(1); // Reset to first page on filter change
  }

  onSortChange(option: SortOption) {
    this.currentSort.set(option);
    this.currentPage.set(1); // Reset to first page on sort change
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onItemsPerPageChange(limit: number) {
    this.itemsPerPage.set(Number(limit));
    this.currentPage.set(1);
  }
}
