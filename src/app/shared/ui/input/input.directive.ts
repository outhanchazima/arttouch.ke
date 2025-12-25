import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appInput]',
})
export class InputDirective {
  hasError = input<boolean>(false);

  @HostBinding('class')
  get classes() {
    const baseClasses =
      'appearance-none relative block w-full px-4 py-2 border placeholder-gray-400 text-gray-900 rounded-none focus:outline-none focus:ring-0 focus:border-[#111] transition-all sm:text-sm';
    const borderClass = this.hasError() ? 'border-red-500' : 'border-gray-300';
    return `${baseClasses} ${borderClass}`;
  }
}
