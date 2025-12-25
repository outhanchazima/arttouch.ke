import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Trigger - Ultra Compact -->
      <button
        (click)="toggle()"
        class="flex items-center gap-1 text-[11px] font-medium px-2 py-1 border transition-colors"
        [class]="isOpen() || isActive() 
          ? 'border-gray-900 text-gray-900 bg-gray-50' 
          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'"
      >
        {{ label() }}
        @if (isActive()) {
          <span class="w-1 h-1 rounded-full bg-orange-500"></span>
        }
        <svg class="h-2.5 w-2.5 transition-transform" [class.rotate-180]="isOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Panel -->
      @if (isOpen()) {
        <div
          class="absolute top-full mt-1 bg-white shadow-lg border border-gray-100 z-50 max-h-60 overflow-auto"
          [class.left-0]="align() === 'left'"
          [class.right-0]="align() === 'right'"
          [class.min-w-[140px]]="width() === 'md'"
          [class.min-w-[120px]]="width() === 'sm'"
          [class.p-2]="padding()"
        >
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
})
export class DropdownComponent {
  label = input.required<string>();
  prefix = input<string>('');
  isActive = input<boolean>(false);
  align = input<'left' | 'right'>('left');
  width = input<'sm' | 'md'>('md');
  padding = input<boolean>(true);

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
