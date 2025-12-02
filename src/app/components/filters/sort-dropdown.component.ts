import { CommonModule } from '@angular/common';
import { Component, input, output, ViewChild } from '@angular/core';
import { SortOption } from '../../services/product.service';
import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  template: `
    <app-dropdown
      [label]="getLabel(currentSort())"
      prefix="Sort by:"
      align="right"
      width="sm"
      [padding]="false"
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
    </app-dropdown>
  `,
})
export class SortDropdownComponent {
  currentSort = input.required<SortOption>();
  sortChange = output<SortOption>();

  @ViewChild(DropdownComponent) dropdown!: DropdownComponent;

  options: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  select(option: SortOption) {
    this.sortChange.emit(option);
    this.dropdown.close();
  }

  getLabel(value: SortOption) {
    return this.options.find((o) => o.value === value)?.label || 'Default';
  }
}
