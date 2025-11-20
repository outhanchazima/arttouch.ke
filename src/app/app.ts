import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ProductGridComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
      <app-header />
      <main class="flex-grow">
        <app-hero />
        <app-product-grid />
      </main>
      <app-footer />
    </div>
  `
})
export class App {
  protected readonly title = signal('arttouch.ke');
}
