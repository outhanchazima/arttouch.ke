import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'glass';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'getClasses()',
  },
})
export class BadgeComponent {
  variant = input<BadgeVariant>('primary');
  size = input<BadgeSize>('md');

  protected getClasses(): string {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-full transition-colors';
    const sizeClasses = this.size() === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

    let variantClasses = '';
    switch (this.variant()) {
      case 'primary':
        variantClasses = 'bg-slate-900 text-white';
        break;
      case 'secondary':
        variantClasses = 'bg-slate-100 text-slate-900';
        break;
      case 'outline':
        variantClasses = 'border border-slate-200 text-slate-700';
        break;
      case 'accent':
        variantClasses = 'bg-indigo-50 text-indigo-600 border border-indigo-100';
        break;
      case 'ghost':
        variantClasses = 'bg-transparent text-slate-600 hover:bg-slate-50';
        break;
      case 'glass':
        variantClasses = 'bg-white/90 backdrop-blur text-indigo-600 shadow-sm';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses}`;
  }
}
