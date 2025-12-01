import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { SortOption } from '../../services/product.service';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        (click)="toggle()"
        class="flex items-center gap-2 font-medium text-slate-700 hover:text-indigo-600 transition-colors"
      >
        <span class="text-slate-500">Sort by:</span>
        {{ getLabel(currentSort()) }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-slate-400 transition-transform duration-200"
          [class.rotate-180]="isOpen()"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7 7"
          />
        </svg>
      </button>

      @if (isOpen()) {
      <div
        class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200"
      >
        @for (option of options; track option.value) {
        <button
          (click)="select(option.value)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
          [class.text-indigo-600]="currentSort() === option.value"
          [class.font-medium]="currentSort() === option.value"
          [class.text-slate-600]="currentSort() !== option.value"
        >
          {{ option.label }}
        </button>
        }
      </div>
      }

      <!-- Backdrop to close -->
      @if (isOpen()) {
      <div class="fixed inset-0 z-10" (click)="close()"></div>
      }
    </div>
  `,
})
export class SortDropdownComponent {
  currentSort = input.required<SortOption>();
  sortChange = output<SortOption>();

  isOpen = signal(false);

  options: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  select(option: SortOption) {
    this.sortChange.emit(option);
    this.close();
  }

  getLabel(value: SortOption) {
    return this.options.find((o) => o.value === value)?.label || 'Default';
  }
}
