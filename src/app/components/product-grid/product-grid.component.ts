import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterCriteria, ProductService, SortOption } from '../../services/product.service';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { ProductFiltersComponent } from '../filters/product-filters.component';
import { SortDropdownComponent } from '../filters/sort-dropdown.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductFiltersComponent,
    SortDropdownComponent,
    PaginationComponent,
    ContainerComponent,
  ],
  template: `
    <!-- Page Header / Banner -->
    <section class="bg-white py-16 mb-12">
      <app-container>
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <!-- Title & Breadcrumbs -->
          <div class="text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Shop</h1>
            <div
              class="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500"
            >
              <span class="hover:text-gray-900 cursor-pointer">Home</span>
              <span class="text-gray-300">/</span>
              <span class="text-gray-900">Shop</span>
            </div>
          </div>

          <!-- Optional: Banner Image Placeholder (to match the look) -->
          <div class="hidden md:block w-1/2 h-64 bg-gray-200 rounded-none"></div>
        </div>
      </app-container>
    </section>

    <section class="pb-12 bg-white">
      <app-container>
        <!-- Filter Bar -->
        <div
          class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10 pb-6 border-b border-gray-100"
        >
          <!-- Left: Filters -->
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span class="text-gray-500 font-medium">Filter by</span>
            <app-product-filters (filterChange)="onFilterChange($event)" />
          </div>

          <!-- Right: Sorting & Layout -->
          <div
            class="flex flex-wrap items-center gap-6 w-full lg:w-auto justify-between lg:justify-end"
          >
            <!-- Items Per Page -->
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span>Show:</span>
              <select
                [ngModel]="itemsPerPage()"
                (ngModelChange)="onItemsPerPageChange($event)"
                class="bg-transparent border-none font-medium text-gray-900 focus:ring-0 cursor-pointer"
              >
                <option [value]="8">8</option>
                <option [value]="12">12</option>
                <option [value]="24">24</option>
              </select>
            </div>

            <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

            <app-sort-dropdown [currentSort]="currentSort()" (sortChange)="onSortChange($event)" />

            <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

            <!-- Layout Toggles -->
            <div class="flex items-center gap-1">
              <!-- 3 Columns -->
              <button
                (click)="setGridColumns(3)"
                class="p-2 rounded-none transition-colors hidden md:block"
                [class.text-orange-500]="layout() === 'grid' && gridColumns() === 3"
                [class.bg-orange-50]="layout() === 'grid' && gridColumns() === 3"
                [class.text-gray-400]="layout() !== 'grid' || gridColumns() !== 3"
                [class.hover:text-gray-600]="layout() !== 'grid' || gridColumns() !== 3"
                title="3 Columns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h4.6v16H4V4zm5.7 0h4.6v16H9.7V4zm5.7 0H20v16h-4.6V4z" />
                </svg>
              </button>

              <!-- 4 Columns -->
              <button
                (click)="setGridColumns(4)"
                class="p-2 rounded-none transition-colors hidden lg:block"
                [class.text-orange-500]="layout() === 'grid' && gridColumns() === 4"
                [class.bg-orange-50]="layout() === 'grid' && gridColumns() === 4"
                [class.text-gray-400]="layout() !== 'grid' || gridColumns() !== 4"
                [class.hover:text-gray-600]="layout() !== 'grid' || gridColumns() !== 4"
                title="4 Columns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 4h3.25v16H4V4zm4.25 0h3.25v16H8.25V4zm4.25 0h3.25v16H12.5V4zm4.25 0H20v16h-3.25V4z"
                  />
                </svg>
              </button>

              <!-- 5 Columns -->
              <button
                (click)="setGridColumns(5)"
                class="p-2 rounded-none transition-colors hidden xl:block"
                [class.text-orange-500]="layout() === 'grid' && gridColumns() === 5"
                [class.bg-orange-50]="layout() === 'grid' && gridColumns() === 5"
                [class.text-gray-400]="layout() !== 'grid' || gridColumns() !== 5"
                [class.hover:text-gray-600]="layout() !== 'grid' || gridColumns() !== 5"
                title="5 Columns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 4h2.4v16H4V4zm3.4 0h2.4v16H7.4V4zm3.4 0h2.4v16h-2.4V4zm3.4 0h2.4v16h-2.4V4zm3.4 0H20v16h-2.4V4z"
                  />
                </svg>
              </button>

              <!-- List View -->
              <button
                (click)="layout.set('list')"
                class="p-2 rounded-none transition-colors"
                [class.text-orange-500]="layout() === 'list'"
                [class.bg-orange-50]="layout() === 'list'"
                [class.text-gray-400]="layout() !== 'list'"
                [class.hover:text-gray-600]="layout() !== 'list'"
                title="List View"
              >
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
            </div>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="mb-6 text-sm text-gray-500">
          Showing <span class="font-medium text-gray-900">{{ startItemIndex() }}</span> -
          <span class="font-medium text-gray-900">{{ endItemIndex() }}</span> of
          <span class="font-medium text-gray-900">{{ totalItems() }}</span> results
        </div>

        <!-- Product Grid -->
        <div
          class="grid gap-8 grid-cols-1"
          [class.sm:grid-cols-2]="layout() === 'grid'"
          [class.md:grid-cols-3]="layout() === 'grid' && gridColumns() === 3"
          [class.lg:grid-cols-3]="layout() === 'grid' && gridColumns() === 3"
          [class.lg:grid-cols-4]="
            layout() === 'grid' && (gridColumns() === 4 || gridColumns() === 5)
          "
          [class.xl:grid-cols-3]="layout() === 'grid' && gridColumns() === 3"
          [class.xl:grid-cols-4]="layout() === 'grid' && gridColumns() === 4"
          [class.xl:grid-cols-5]="layout() === 'grid' && gridColumns() === 5"
        >
          @for (product of paginatedProducts(); track product.id) {
          <app-product-card [product]="product" [layout]="layout()" />
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
      </app-container>
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
  layout = signal<'grid' | 'list'>('grid');
  gridColumns = signal<number>(4);

  setGridColumns(cols: number) {
    this.layout.set('grid');
    this.gridColumns.set(cols);
  }

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
