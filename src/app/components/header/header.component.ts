import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink, ContainerComponent],
  template: `
    <header class="relative bg-white">
      <app-container>
        <div class="flex items-center justify-between h-24">
          <!-- Logo -->
          <div class="shrink-0 cursor-pointer" routerLink="/">
            <span class="text-3xl font-serif font-bold text-gray-900 tracking-tight">
              <span class="text-orange-500">A</span>rtTouch
            </span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a href="/" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Home</a
            >
            <a href="/store" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Shop</a
            >
            <a href="#" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Products</a
            >
            <a href="#" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Pages</a
            >
            <a href="#" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Blog</a
            >
            <a href="#" class="text-gray-900 hover:text-orange-500 font-medium transition-colors"
              >Elements</a
            >
          </nav>

          <!-- Right Section: Icons -->
          <div class="flex items-center space-x-2">
            <!-- Search -->
            <button
              (click)="toggleSearch()"
              class="p-2 text-gray-900 hover:text-orange-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <!-- User (Account) -->
            <button
              routerLink="/login"
              class="p-2 text-gray-900 hover:text-orange-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <!-- Wishlist -->
            <button
              class="relative p-2 text-gray-900 hover:text-orange-500 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              @if (wishlistService.items().length > 0) {
              <span
                class="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full"
              >
                {{ wishlistService.items().length }}
              </span>
              }
            </button>

            <!-- Cart Button -->
            <button
              (click)="cartService.toggleCart()"
              class="relative p-2 text-gray-900 hover:text-orange-500 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              @if (cartService.count() > 0) {
              <span
                class="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full"
              >
                {{ cartService.count() }}
              </span>
              }
            </button>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 text-gray-500 hover:text-orange-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </app-container>

      <!-- Mobile Menu Drawer -->
      <div
        class="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300"
        [class.opacity-0]="!isMobileMenuOpen()"
        [class.pointer-events-none]="!isMobileMenuOpen()"
        (click)="toggleMobileMenu()"
      ></div>

      <div
        class="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden flex flex-col"
        [class.trangray-x-0]="isMobileMenuOpen()"
        [class.-trangray-x-full]="!isMobileMenuOpen()"
      >
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <span class="text-xl font-bold text-gray-900">Menu</span>
          <button (click)="toggleMobileMenu()" class="p-2 text-gray-500 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav class="flex-1 p-6 space-y-6 overflow-y-auto">
          <a
            routerLink="/"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Shop
          </a>
          <a
            href="#"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Products
          </a>
          <a
            href="#"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Pages
          </a>
          <a
            href="#"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Blog
          </a>
          <a
            href="#"
            (click)="toggleMobileMenu()"
            class="block text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
          >
            Elements
          </a>
        </nav>

        <div class="p-6 border-t border-gray-100 bg-gray-50">
          <div class="flex flex-col gap-4">
            <a
              routerLink="/login"
              (click)="toggleMobileMenu()"
              class="flex items-center gap-3 text-gray-600 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Account
            </a>
            <button
              (click)="toggleMobileMenu(); wishlistService.toggleWishlist(null!)"
              class="flex items-center gap-3 text-gray-600 font-medium"
            >
              <!-- Note: wishlist toggle usually needs a product, but here we might just want to navigate to wishlist page if it existed. 
                   For now, I'll just keep the link or remove the action. 
                   Actually, let's just link to a wishlist page or keep it simple. 
                   The header has a wishlist icon that opens something? No, it just shows count.
                   Let's just show the Wishlist link.
              -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Wishlist ({{ wishlistService.items().length }})
            </button>
          </div>
        </div>
      </div>

      <!-- Search Overlay -->
      @if (isSearchOpen()) {
      <div
        class="absolute top-0 left-0 right-0 bg-white z-50 shadow-lg animate-in slide-in-from-top-5 duration-300"
      >
        <div class="container mx-auto px-4 py-6">
          <div class="relative max-w-3xl mx-auto">
            <div class="flex items-center gap-4">
              <div class="relative flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute left-4 top-1/2 -trangray-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search for artworks..."
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                  autoFocus
                />
              </div>
              <button
                (click)="toggleSearch()"
                class="p-2 text-gray-400 hover:text-orange-500 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Search Results Dropdown -->
            @if (searchQuery().length > 0) {
            <div
              class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-[70vh] overflow-y-auto"
            >
              @if (searchResults().length > 0) {
              <div class="p-2">
                <div
                  class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2"
                >
                  Products
                </div>
                @for (product of searchResults(); track product.id) {
                <a
                  [routerLink]="['/product', product.id]"
                  (click)="closeSearch()"
                  class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div class="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      [src]="product.image"
                      [alt]="product.name"
                      class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4
                      class="font-medium text-gray-900 group-hover:text-orange-500 transition-colors"
                    >
                      {{ product.name }}
                    </h4>
                    <p class="text-sm text-gray-500">{{ product.category }}</p>
                    <p class="text-sm font-semibold text-gray-900 mt-1">\${{ product.price }}</p>
                  </div>
                </a>
                }
              </div>
              } @else {
              <div class="p-8 text-center text-gray-500">
                <p>No results found for "{{ searchQuery() }}"</p>
              </div>
              }
            </div>
            }
          </div>
        </div>
      </div>
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" (click)="toggleSearch()"></div>
      }
    </header>
  `,
})
export class HeaderComponent {
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);

  isSearchOpen = signal(false);
  searchQuery = signal('');
  isMobileMenuOpen = signal(false);

  searchResults = computed(() => {
    const query = this.searchQuery();
    if (!query) return [];
    return this.productService.searchProducts(query);
  });

  toggleSearch() {
    this.isSearchOpen.update((v) => !v);
    if (!this.isSearchOpen()) {
      this.searchQuery.set('');
    }
  }

  closeSearch() {
    this.isSearchOpen.set(false);
    this.searchQuery.set('');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }
}
