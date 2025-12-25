import { CommonModule } from '@angular/common';
import { Component, input, output, ViewChild } from '@angular/core';
import { SortOption } from '../../services/product.service';
import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-sort-dropdown',
  imports: [CommonModule, DropdownComponent],
  template: `
    <app-dropdown
      [label]="getLabel(currentSort())"
      align="right"
      width="sm"
      [padding]="false"
    >
      @for (option of options; track option.value) {
        <button
          (click)="select(option.value)"
          class="w-full text-left px-2 py-1.5 text-[11px] transition-colors"
          [class]="currentSort() === option.value 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'"
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
    { value: 'price-asc', label: 'Price ↑' },
    { value: 'price-desc', label: 'Price ↓' },
    { value: 'name-asc', label: 'A-Z' },
    { value: 'name-desc', label: 'Z-A' },
  ];

  select(option: SortOption) {
    this.sortChange.emit(option);
    this.dropdown.close();
  }

  getLabel(value: SortOption) {
    return this.options.find((o) => o.value === value)?.label || 'Sort';
  }
}
