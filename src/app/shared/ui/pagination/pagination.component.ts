import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
      <!-- Previous Button -->
      <button
        [disabled]="currentPage() === 1"
        (click)="onPageChange(currentPage() - 1)"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 
               text-gray-600 hover:bg-gray-50 hover:border-gray-300 
               disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent 
               transition-all"
        aria-label="Previous page"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="hidden sm:inline">Previous</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        @for (page of visiblePages(); track page) {
          @if (page === '...') {
            <span class="px-3 py-2 text-gray-400 text-sm">...</span>
          } @else {
            <button
              (click)="onPageChange(+page)"
              class="min-w-[40px] h-10 flex items-center justify-center text-sm font-medium 
                     border transition-all"
              [class]="currentPage() === page 
                ? 'bg-[#111] text-white border-[#111]' 
                : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'"
              [attr.aria-current]="currentPage() === page ? 'page' : null"
            >
              {{ page }}
            </button>
          }
        }
      </div>

      <!-- Next Button -->
      <button
        [disabled]="currentPage() === totalPages()"
        (click)="onPageChange(currentPage() + 1)"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 
               text-gray-600 hover:bg-gray-50 hover:border-gray-300 
               disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent 
               transition-all"
        aria-label="Next page"
      >
        <span class="hidden sm:inline">Next</span>
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>

    <!-- Page Info (Mobile) -->
    <div class="flex justify-center mt-4 text-xs text-gray-500 sm:hidden">
      Page {{ currentPage() }} of {{ totalPages() }}
    </div>
  `,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  /**
   * Computes visible page numbers with ellipsis for large page counts.
   * Shows: first page, last page, and 2 pages around current page.
   */
  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      // Pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  });

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
