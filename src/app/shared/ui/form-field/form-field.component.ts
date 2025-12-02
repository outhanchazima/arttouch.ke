import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule],
  template: `
    <div class="w-full">
      @if (label()) {
      <label [for]="for()" class="block text-sm font-medium text-slate-700 mb-1">
        {{ label() }}
      </label>
      }
      <div class="relative">
        <ng-content></ng-content>
      </div>
      @if (errorMessage()) {
      <p class="mt-1 text-sm text-red-500">{{ errorMessage() }}</p>
      }
    </div>
  `,
})
export class FormFieldComponent {
  label = input<string>('');
  for = input<string>('');
  errorMessage = input<string>('');
}
