import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <span
              class="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              ArtTouch
            </span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >Home</a
            >
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >Shop</a
            >
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >Collections</a
            >
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >About</a
            >
          </nav>

          <!-- Right Section: Search & Cart -->
          <div class="flex items-center space-x-4">
            <!-- Search Button -->
            <button
              class="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
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

            <!-- Wishlist Button -->
            <button
              class="relative p-2 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all group"
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
                class="absolute top-1 right-1 h-4 w-4 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full group-hover:scale-110 transition-transform"
              >
                {{ wishlistService.items().length }}
              </span>
              }
            </button>

            <!-- Cart Button -->
            <button
              (click)="cartService.toggleCart()"
              class="relative p-2 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all group"
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
                class="absolute top-1 right-1 h-4 w-4 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full group-hover:scale-110 transition-transform"
              >
                {{ cartService.count() }}
              </span>
              }
            </button>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 text-slate-500 hover:text-indigo-600 rounded-full">
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
      </div>
    </header>
  `,
})
export class HeaderComponent {
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
}
