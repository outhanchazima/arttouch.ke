import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Trigger -->
      <button
        (click)="toggle()"
        class="group flex items-center gap-1 font-medium transition-colors"
        [class.text-slate-900]="!isActive()"
        [class.text-indigo-600]="isOpen() || isActive()"
        [class.hover:text-indigo-600]="!isActive()"
      >
        @if (isActive()) {
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        } @if (prefix()) {
        <span class="text-slate-500 font-normal">{{ prefix() }}</span>
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

      <!-- Panel -->
      @if (isOpen()) {
      <div
        class="absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-20 animate-in fade-in zoom-in-95 duration-200"
        [class.left-0]="align() === 'left'"
        [class.right-0]="align() === 'right'"
        [class.w-64]="width() === 'md'"
        [class.w-48]="width() === 'sm'"
        [class.p-4]="padding()"
        [class.py-2]="!padding()"
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
