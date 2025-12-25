import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';

import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, BadgeComponent],
  template: `
    <div
      class="group relative bg-white transition-all duration-300 border border-gray-100 overflow-hidden"
      [class.flex]="layout() === 'list'"
      [class.flex-col]="layout() === 'list'"
      [class.sm:flex-row]="layout() === 'list'"
      [class.items-center]="layout() === 'list'"
      [class.gap-6]="layout() === 'list'"
      [class.p-4]="layout() === 'list'"
    >
      <!-- Image Container -->
      <div
        class="relative overflow-hidden bg-gray-100 cursor-pointer"
        [class.aspect-square]="layout() === 'grid'"
        [class.w-full]="layout() === 'grid' || layout() === 'list'"
        [class.sm:w-48]="layout() === 'list'"
        [class.h-48]="layout() === 'list'"
        [class.shrink-0]="layout() === 'list'"
        [routerLink]="['/product', product().id]"
      >
        <img
          [src]="product().image"
          [alt]="product().name"
          class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        <!-- Quick Action Overlay (Grid View Only) -->
        @if (layout() === 'grid') {
        <div
          class="absolute top-3 right-3 flex flex-col gap-2 z-10"
          (click)="$event.stopPropagation()"
        >
          <button
            (click)="onAddToCart()"
            class="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors shadow-lg"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            (click)="onToggleWishlist()"
            class="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors shadow-lg"
            [class.text-red-500]="isInWishlist()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              [attr.fill]="isInWishlist() ? 'currentColor' : 'none'"
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
          </button>
        </div>
        }

        <!-- Badge -->
        @if (product().rating >= 4.8) {
        <app-badge variant="featured" size="sm" class="absolute top-3 left-3">Top Rated</app-badge>
        }
      </div>

      <!-- Content -->
      <div
        [class.space-y-2]="layout() === 'grid'"
        [class.p-4]="layout() === 'grid'"
        [class.flex-1]="layout() === 'list'"
        [class.flex]="layout() === 'list'"
        [class.flex-col]="layout() === 'list'"
        [class.justify-center]="layout() === 'list'"
      >
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {{ product().category }}
        </p>
        <h3
          class="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors"
          [class.mb-2]="layout() === 'list'"
        >
          {{ product().name }}
        </h3>

        @if (layout() === 'list') {
        <p class="text-gray-500 text-sm mb-4 line-clamp-2">
          Experience the beauty of {{ product().name }}, a masterpiece in {{ product().category }}.
          Perfect for adding a touch of elegance to any space.
        </p>
        }

        <div class="flex items-center justify-between">
          <p class="text-xl font-bold text-gray-900">KES {{ product().price }}</p>

          @if (layout() === 'grid') {
          <div class="flex items-center text-yellow-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="ml-1 text-gray-500 font-medium">{{ product().rating }}</span>
          </div>
          }

          @if (layout() === 'list') {
          <div class="flex gap-3">
             <button
              (click)="onAddToCart()"
              class="px-6 py-2 bg-gray-900 text-white hover:bg-orange-500 transition-colors font-medium text-sm"
            >
              Add to Cart
            </button>
            <button
              (click)="onToggleWishlist()"
              class="p-2 border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors"
              [class.text-red-500]="isInWishlist()"
              [class.border-red-500]="isInWishlist()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                [attr.fill]="isInWishlist() ? 'currentColor' : 'none'"
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
            </button>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  layout = input<'grid' | 'list'>('grid');

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  onAddToCart() {
    this.cartService.addToCart(this.product());
  }

  onToggleWishlist() {
    this.wishlistService.toggleWishlist(this.product());
  }

  isInWishlist() {
    return this.wishlistService.isInWishlist(this.product().id);
  }
}
