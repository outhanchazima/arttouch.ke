import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterCriteria, ProductService } from '../../services/product.service';
import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
  template: `
    <div class="flex flex-wrap items-center gap-6">
      <!-- Categories Filter -->
      <app-dropdown label="Categories" [isActive]="currentFilters().categories.length > 0">
        <div class="space-y-2">
          @for (category of productService.categories(); track category) {
          <label class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center">
              <input
                type="checkbox"
                [checked]="currentFilters().categories.includes(category)"
                (change)="toggleCategory(category)"
                class="peer h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 transition-all"
              />
            </div>
            <span class="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
              {{ category }}
            </span>
          </label>
          }
        </div>
      </app-dropdown>

      <!-- Colors Filter -->
      <app-dropdown label="Colors" [isActive]="currentFilters().colors.length > 0">
        <div class="grid grid-cols-4 gap-2">
          @for (color of productService.colors(); track color) {
          <button
            (click)="toggleColor(color)"
            class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
            [style.backgroundColor]="color"
            [class.border-indigo-600]="currentFilters().colors.includes(color)"
            [class.border-transparent]="!currentFilters().colors.includes(color)"
            [title]="color"
          >
            @if (currentFilters().colors.includes(color)) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white mx-auto drop-shadow-md"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            }
          </button>
          }
        </div>
      </app-dropdown>

      <!-- Price Filter -->
      <app-dropdown label="Price" [isActive]="isPriceActive()">
        <div class="space-y-4 min-w-[200px]">
          <div class="flex items-center justify-between text-sm text-slate-600">
            <span>Range</span>
            <span class="font-medium text-slate-900">
              \${{ currentFilters().minPrice || productService.priceRange().min }} - \${{
                currentFilters().maxPrice || productService.priceRange().max
              }}
            </span>
          </div>

          <div class="flex gap-4">
            <div class="space-y-1">
              <label class="text-xs text-slate-500">Min</label>
              <input
                type="number"
                [min]="productService.priceRange().min"
                [max]="currentFilters().maxPrice || productService.priceRange().max"
                [ngModel]="currentFilters().minPrice"
                (ngModelChange)="updateMinPrice($event)"
                class="w-full px-2 py-1 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Min"
              />
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-500">Max</label>
              <input
                type="number"
                [min]="currentFilters().minPrice || productService.priceRange().min"
                [max]="productService.priceRange().max"
                [ngModel]="currentFilters().maxPrice"
                (ngModelChange)="updateMaxPrice($event)"
                class="w-full px-2 py-1 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Max"
              />
            </div>
          </div>

          <button
            (click)="resetPrice()"
            class="w-full py-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
          >
            Reset Price
          </button>
        </div>
      </app-dropdown>

      <!-- Clear All -->
      @if (hasActiveFilters()) {
      <button
        (click)="clearAll()"
        class="text-sm text-red-500 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Clear filters
      </button>
      }
    </div>
  `,
})
export class ProductFiltersComponent {
  productService = inject(ProductService);

  filterChange = output<FilterCriteria>();

  currentFilters = signal<FilterCriteria>({
    categories: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
  });

  isPriceActive() {
    const f = this.currentFilters();
    return f.minPrice !== null || f.maxPrice !== null;
  }

  hasActiveFilters() {
    const f = this.currentFilters();
    return f.categories.length > 0 || f.colors.length > 0 || this.isPriceActive();
  }

  toggleCategory(category: string) {
    this.currentFilters.update((f) => {
      const cats = f.categories.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category];
      return { ...f, categories: cats };
    });
    this.emitChange();
  }

  toggleColor(color: string) {
    this.currentFilters.update((f) => {
      const colors = f.colors.includes(color)
        ? f.colors.filter((c) => c !== color)
        : [...f.colors, color];
      return { ...f, colors: colors };
    });
    this.emitChange();
  }

  updateMinPrice(val: number | null) {
    this.currentFilters.update((f) => ({ ...f, minPrice: val }));
    this.emitChange();
  }

  updateMaxPrice(val: number | null) {
    this.currentFilters.update((f) => ({ ...f, maxPrice: val }));
    this.emitChange();
  }

  resetPrice() {
    this.currentFilters.update((f) => ({ ...f, minPrice: null, maxPrice: null }));
    this.emitChange();
  }

  clearAll() {
    this.currentFilters.set({
      categories: [],
      colors: [],
      minPrice: null,
      maxPrice: null,
    });
    this.emitChange();
  }

  private emitChange() {
    this.filterChange.emit(this.currentFilters());
  }
}
