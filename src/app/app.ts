import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AnnouncementBarComponent } from './components/announcement-bar/announcement-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartSidebarComponent, AnnouncementBarComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
      <app-announcement-bar />
      <app-header />
      <app-cart-sidebar />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {
  protected readonly title = signal('arttouch.ke');
}
