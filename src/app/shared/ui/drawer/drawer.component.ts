import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
      [class.opacity-0]="!isOpen()"
      [class.pointer-events-none]="!isOpen()"
      (click)="onClose.emit()"
    ></div>

    <!-- Drawer Panel -->
    <div
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      [class.translate-x-full]="!isOpen()"
      [class.translate-x-0]="isOpen()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DrawerComponent {
  isOpen = input.required<boolean>();
  onClose = output<void>();
}
