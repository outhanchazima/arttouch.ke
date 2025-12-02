import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <ng-content></ng-content>
    </div>
  `,
})
export class ContainerComponent {}
