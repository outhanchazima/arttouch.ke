import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-8 rounded-none shadow-sm border border-gray-100 h-full">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
