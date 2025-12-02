import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appInput]',
})
export class InputDirective {
  hasError = input<boolean>(false);

  @HostBinding('class')
  get classes() {
    const baseClasses =
      'appearance-none relative block w-full px-4 py-3 border placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm';
    const borderClass = this.hasError() ? 'border-red-500' : 'border-slate-200';
    return `${baseClasses} ${borderClass}`;
  }
}
