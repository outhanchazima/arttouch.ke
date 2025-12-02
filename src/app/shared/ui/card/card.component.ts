import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
