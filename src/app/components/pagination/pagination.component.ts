import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-2 mt-12">
      <button
        [disabled]="currentPage() === 1"
        (click)="onPageChange(currentPage() - 1)"
        class="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      @for (page of pages; track page) {
      <button
        (click)="onPageChange(page)"
        class="w-10 h-10 rounded-lg font-medium transition-colors"
        [class.bg-indigo-600]="currentPage() === page"
        [class.text-white]="currentPage() === page"
        [class.text-slate-600]="currentPage() !== page"
        [class.hover:bg-slate-50]="currentPage() !== page"
      >
        {{ page }}
      </button>
      }

      <button
        [disabled]="currentPage() === totalPages()"
        (click)="onPageChange(currentPage() + 1)"
        class="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
    const current = this.currentPage();

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
