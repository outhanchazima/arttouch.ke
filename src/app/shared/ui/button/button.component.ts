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
      class="group relative flex justify-center items-center py-3 px-4 border text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        return 'border-transparent text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-900';
      case 'secondary':
        return 'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500';
      case 'outline':
        return 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-indigo-500';
      case 'ghost':
        return 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500';
      default:
        return 'border-transparent text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-900';
    }
  }
}
