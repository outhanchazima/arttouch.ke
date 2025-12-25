import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'featured' | 'new' | 'glass';
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
      'inline-flex items-center justify-center font-bold uppercase tracking-wide transition-colors';
    const sizeClasses = this.size() === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

    let variantClasses = '';
    switch (this.variant()) {
      case 'primary':
        variantClasses = 'bg-[#111] text-white';
        break;
      case 'secondary':
        variantClasses = 'bg-gray-100 text-gray-900';
        break;
      case 'outline':
        variantClasses = 'border border-gray-300 text-gray-700 bg-white';
        break;
      case 'accent':
        variantClasses = 'bg-gray-50 text-gray-900 border border-gray-200';
        break;
      case 'featured':
        variantClasses = 'bg-orange-500 text-white';
        break;
      case 'new':
        variantClasses = 'bg-orange-500 text-white';
        break;
      case 'glass':
        variantClasses = 'bg-white/90 backdrop-blur text-gray-900 shadow-sm';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses}`;
  }
}
