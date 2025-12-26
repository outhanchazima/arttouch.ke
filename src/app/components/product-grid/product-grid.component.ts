import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilterCriteria, ProductService, SortOption } from '../../services/product.service';
import { SeoService } from '../../services/seo.service';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { ProductFiltersComponent } from '../filters/product-filters.component';
import { SortDropdownComponent } from '../filters/sort-dropdown.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ProductCardComponent,
    ProductFiltersComponent,
    SortDropdownComponent,
    PaginationComponent,
    ContainerComponent,
  ],
  template: `
    <!-- Hero Section - Clean & Minimal -->
    <section class="bg-white py-8 md:py-12 border-b border-gray-100">
      <app-container>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <!-- Title & Breadcrumbs -->
          <div>
            <nav class="flex items-center gap-2 text-xs text-gray-400 mb-3 uppercase tracking-wider">
              <a routerLink="/" class="hover:text-gray-900 transition-colors">Home</a>
              <span>/</span>
              <span class="text-gray-900 font-medium">Shop</span>
            </nav>
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              Our Collection
            </h1>
          </div>

          <!-- Trust Signals - Conversion Boosters -->
          <div class="flex items-center gap-6 text-xs">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Free Delivery 10K+</span>
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-gray-600">Secure Payment</span>
            </div>
            <div class="hidden md:flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span class="text-gray-600">Easy Returns</span>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <section class="py-8 md:py-12 bg-gray-50">
      <app-container>
        <!-- Filter Bar - Simplified -->
        <div class="bg-white border border-gray-100 p-4 mb-8">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <!-- Left: Filter Summary -->
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-sm text-gray-500">{{ totalItems() }} products</span>
              
              @if (activeFilterCount() > 0) {
                <div class="h-4 w-px bg-gray-200"></div>
                <button 
                  (click)="clearFilters()"
                  class="text-xs text-gray-900 hover:text-orange-500 font-medium flex items-center gap-1 underline underline-offset-2"
                >
                  Clear {{ activeFilterCount() }} filter{{ activeFilterCount() > 1 ? 's' : '' }}
                </button>
              }
            </div>

            <!-- Right: Controls -->
            <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <!-- Filters Dropdown -->
              <div class="flex items-center gap-2">
                <app-product-filters (filterChange)="onFilterChange($event)" />
              </div>
              
              <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

              <!-- Sort -->
              <app-sort-dropdown [currentSort]="currentSort()" (sortChange)="onSortChange($event)" />

              <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

              <!-- Items Per Page -->
              <div class="hidden sm:flex items-center gap-2 text-sm">
                <label class="text-gray-500">Show:</label>
                <select
                  [ngModel]="itemsPerPage()"
                  (ngModelChange)="onItemsPerPageChange($event)"
                  class="bg-white border border-gray-200 px-2 py-1.5 text-sm font-medium text-gray-900 focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option [value]="12">12</option>
                  <option [value]="24">24</option>
                  <option [value]="48">48</option>
                </select>
              </div>

              <!-- Layout Toggles (Desktop) -->
              <div class="hidden md:flex items-center border border-gray-200 ml-auto lg:ml-0">
                <button
                  (click)="setGridColumns(3)"
                  class="p-2 transition-colors"
                  [class]="layout() === 'grid' && gridColumns() === 3 ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'"
                  title="3 Columns"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h4.6v16H4V4zm5.7 0h4.6v16H9.7V4zm5.7 0H20v16h-4.6V4z" />
                  </svg>
                </button>
                <button
                  (click)="setGridColumns(4)"
                  class="p-2 transition-colors hidden lg:block"
                  [class]="layout() === 'grid' && gridColumns() === 4 ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'"
                  title="4 Columns"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h3.25v16H4V4zm4.25 0h3.25v16H8.25V4zm4.25 0h3.25v16H12.5V4zm4.25 0H20v16h-3.25V4z" />
                  </svg>
                </button>
                <button
                  (click)="setGridColumns(5)"
                  class="p-2 transition-colors hidden lg:block"
                  [class]="layout() === 'grid' && gridColumns() === 5 ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'"
                  title="5 Columns"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h3.25v16H4V4zm4.25 0h3.25v16H8.25V4zm4.25 0h3.25v16H12.5V4zm4.25 0H20v16h-3.25V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        @if (paginatedProducts().length > 0) {
          <div class="grid gap-4 md:gap-6" [class]="gridClasses()">
            @for (product of paginatedProducts(); track product.id) {
              <app-product-card [product]="product" [layout]="layout()" />
            }
          </div>

          <!-- Pagination -->
          @if (totalPages() > 1) {
            <div class="mt-12">
              <app-pagination
                [currentPage]="currentPage()"
                [totalPages]="totalPages()"
                (pageChange)="onPageChange($event)"
              />
            </div>
          }

          <!-- Conversion CTA - After browsing -->
          <div class="mt-12 bg-white border border-gray-100 p-6 md:p-8 text-center">
            <p class="text-sm text-gray-500 mb-2">Need help choosing?</p>
            <h3 class="text-lg md:text-xl font-serif font-bold text-gray-900 mb-4">
              Get personalized recommendations
            </h3>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href="https://wa.me/254723709005"
                target="_blank"
                class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a 
                routerLink="/contact"
                class="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
              >
                Contact Us
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="bg-white border border-gray-100 text-center py-16 px-6">
            <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="text-lg font-bold text-gray-900 mb-2">No products found</h3>
            <p class="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button 
              (click)="clearFilters()"
              class="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        }
      </app-container>
    </section>

    <!-- Social Proof / Urgency Banner -->
    <section class="bg-gray-900 text-white py-4">
      <app-container>
        <div class="flex items-center justify-center gap-6 text-xs md:text-sm">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>{{ getRandomViewers() }} people viewing now</span>
          </div>
          <div class="hidden sm:block w-px h-4 bg-gray-700"></div>
          <div class="hidden sm:flex items-center gap-2">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>500+ 5-star reviews</span>
          </div>
        </div>
      </app-container>
    </section>
  `,
  styles: [`
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  `],
})
export class ProductGridComponent implements OnInit {
  private productService = inject(ProductService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Shop Educational Resources',
      description: 'Browse our complete collection of Montessori and ECDE educational resources. Quality learning materials, toys, and classroom supplies in Kenya.',
      keywords: 'shop educational resources, Montessori toys Kenya, ECDE materials, learning toys, classroom supplies Nairobi',
      ogUrl: 'https://arttouch.ke/products',
      canonicalUrl: 'https://arttouch.ke/products',
      type: 'website',
    });
  }

  filterCriteria = signal<FilterCriteria>({
    categories: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
  });

  currentSort = signal<SortOption>('default');
  currentPage = signal(1);
  itemsPerPage = signal(12);
  layout = signal<'grid' | 'list'>('grid');
  gridColumns = signal<number>(4);

  // Computed: Active filter count
  activeFilterCount = computed(() => {
    const criteria = this.filterCriteria();
    let count = 0;
    count += criteria.categories.length;
    count += criteria.colors.length;
    if (criteria.minPrice) count++;
    if (criteria.maxPrice) count++;
    return count;
  });

  // Computed: Grid classes based on layout and columns
  gridClasses = computed(() => {
    if (this.layout() === 'list') {
      return 'grid-cols-1';
    }
    const cols = this.gridColumns();
    // Mobile shows 2 columns for similar grid sizes
    switch (cols) {
      case 3: return 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
      default: return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
    }
  });

  setGridColumns(cols: number): void {
    this.layout.set('grid');
    this.gridColumns.set(cols);
  }

  // Simulated social proof
  getRandomViewers(): number {
    return Math.floor(Math.random() * 20) + 15;
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

  onFilterChange(criteria: FilterCriteria): void {
    this.filterCriteria.set(criteria);
    this.currentPage.set(1);
  }

  onSortChange(option: SortOption): void {
    this.currentSort.set(option);
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onItemsPerPageChange(limit: number): void {
    this.itemsPerPage.set(Number(limit));
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.filterCriteria.set({
      categories: [],
      colors: [],
      minPrice: null,
      maxPrice: null,
    });
    this.currentPage.set(1);
  }
}
