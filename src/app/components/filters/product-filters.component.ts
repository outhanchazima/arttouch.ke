import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterCriteria, ProductService } from '../../services/product.service';
import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule, DropdownComponent],
  template: `
    <div class="flex flex-wrap items-center gap-1.5">
      <!-- Categories -->
      <app-dropdown label="Category" [isActive]="currentFilters().categories.length > 0" width="sm">
        <div class="space-y-0.5">
          @for (category of productService.categories(); track category) {
            <label class="flex items-center gap-1.5 cursor-pointer px-1.5 py-1 hover:bg-gray-50 text-[11px]">
              <input
                type="checkbox"
                [checked]="currentFilters().categories.includes(category)"
                (change)="toggleCategory(category)"
                class="h-3 w-3 border-gray-300 text-gray-900 focus:ring-0"
              />
              <span class="text-gray-600">{{ category }}</span>
            </label>
          }
        </div>
      </app-dropdown>

      <!-- Colors -->
      <app-dropdown label="Color" [isActive]="currentFilters().colors.length > 0" width="sm">
        <div class="grid grid-cols-5 gap-1">
          @for (color of productService.colors(); track color) {
            <button
              (click)="toggleColor(color)"
              class="w-5 h-5 border transition-all"
              [style.backgroundColor]="color"
              [class.border-gray-900]="currentFilters().colors.includes(color)"
              [class.border-gray-200]="!currentFilters().colors.includes(color)"
              [class.ring-1]="currentFilters().colors.includes(color)"
              [class.ring-gray-900]="currentFilters().colors.includes(color)"
              [title]="color"
            >
              @if (currentFilters().colors.includes(color)) {
                <svg class="h-2.5 w-2.5 text-white mx-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              }
            </button>
          }
        </div>
      </app-dropdown>

      <!-- Price -->
      <app-dropdown label="Price" [isActive]="isPriceActive()" width="sm">
        <div class="space-y-2">
          <div class="flex gap-1.5">
            <input
              type="number"
              [ngModel]="currentFilters().minPrice"
              (ngModelChange)="updateMinPrice($event)"
              class="w-full px-1.5 py-1 text-[11px] border border-gray-200 focus:border-gray-400 outline-none"
              placeholder="Min"
            />
            <input
              type="number"
              [ngModel]="currentFilters().maxPrice"
              (ngModelChange)="updateMaxPrice($event)"
              class="w-full px-1.5 py-1 text-[11px] border border-gray-200 focus:border-gray-400 outline-none"
              placeholder="Max"
            />
          </div>
          <button
            (click)="resetPrice()"
            class="w-full py-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </app-dropdown>
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
