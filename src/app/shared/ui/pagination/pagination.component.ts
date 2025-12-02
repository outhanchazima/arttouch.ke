import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-4 mt-16">
      <!-- Previous -->
      <button
        [disabled]="currentPage() === 1"
        (click)="onPageChange(currentPage() - 1)"
        class="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-0 disabled:cursor-default transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <!-- Pages -->
      <div class="flex items-center gap-2">
        @for (page of pages; track page) {
        <button
          (click)="onPageChange(page)"
          class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300"
          [class.bg-slate-900]="currentPage() === page"
          [class.text-white]="currentPage() === page"
          [class.text-slate-500]="currentPage() !== page"
          [class.hover:text-slate-900]="currentPage() !== page"
        >
          {{ page }}
        </button>
        }
      </div>

      <!-- Next -->
      <button
        [disabled]="currentPage() === totalPages()"
        (click)="onPageChange(currentPage() + 1)"
        class="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-0 disabled:cursor-default transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  `,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  get pages() {
    const total = this.totalPages();
    // Simple logic for now: show all if <= 7, otherwise show range around current
    // For this demo, let's just show all since we have few items
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
