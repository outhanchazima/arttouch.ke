import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      class="group relative flex justify-center items-center py-2 px-4 border text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide rounded-none"
      [class.w-full]="fullWidth()"
      [ngClass]="getVariantClasses()"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);

  onClick = output<MouseEvent>();

  getVariantClasses() {
    switch (this.variant()) {
      case 'primary':
        return 'border-transparent text-white bg-[#111] hover:bg-gray-800';
      case 'secondary':
        return 'border-transparent text-gray-900 bg-gray-100 hover:bg-gray-200';
      case 'outline':
        return 'border-gray-300 text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-400';
      case 'ghost':
        return 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50';
      default:
        return 'border-transparent text-white bg-[#111] hover:bg-gray-800';
    }
  }
}
