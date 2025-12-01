import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        (click)="toggle()"
        class="group flex items-center gap-1 font-medium text-slate-900 hover:text-indigo-600 transition-colors"
        [class.text-indigo-600]="isOpen() || isActive()"
      >
        @if (isActive()) {
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        }
        {{ label() }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-transform duration-200"
          [class.rotate-180]="isOpen()"
          [class.text-indigo-600]="isOpen() || isActive()"
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

      @if (isOpen()) {
      <div
        class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-20 animate-in fade-in zoom-in-95 duration-200"
      >
        <ng-content></ng-content>
      </div>
      }
    </div>
  `,
})
export class FilterDropdownComponent {
  label = input.required<string>();
  isActive = input<boolean>(false);
  isOpen = signal(false);

  constructor(private elementRef: ElementRef) {}

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }
}
