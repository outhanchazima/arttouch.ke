import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
      [class.invisible]="!isOpen()"
      [class.opacity-0]="!isOpen()"
      [class.visible]="isOpen()"
      [class.opacity-100]="isOpen()"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 transition-opacity duration-300"
        (click)="onClose.emit()"
      ></div>

      <!-- Panel -->
      <div
        class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-300"
        [class.scale-95]="!isOpen()"
        [class.translate-y-4]="!isOpen()"
        [class.scale-100]="isOpen()"
        [class.translate-y-0]="isOpen()"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  isOpen = input.required<boolean>();
  onClose = output<void>();
}
