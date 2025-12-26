import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Grid Layout -->
    @if (layout() === 'grid') {
    <div
      class="group bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <!-- Image -->
      <a
        [routerLink]="['/product', product().id]"
        class="block relative bg-gray-50 overflow-hidden"
      >
        <div class="aspect-square overflow-hidden">
          <img
            [src]="product().image"
            [alt]="product().name"
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <!-- Action Buttons (Top Right) -->
        <div
          class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          (click)="$event.preventDefault(); $event.stopPropagation()"
        >
          <button
            (click)="onAddToCart()"
            class="p-1.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-all active:scale-90"
            title="Add to Cart"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            (click)="onToggleWishlist()"
            class="p-1.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-500 transition-all active:scale-90"
            [class.text-red-500]="isInWishlist()"
            [class.bg-red-50]="isInWishlist()"
            title="Add to Wishlist"
          >
            <svg
              class="h-4 w-4"
              [attr.fill]="isInWishlist() ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </a>

      <!-- Details -->
      <div class="p-2 sm:p-3">
        <p class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5 truncate">
          {{ product().category }}
        </p>
        <a [routerLink]="['/product', product().id]">
          <h3
            class="text-[11px] sm:text-xs font-medium text-gray-900 line-clamp-2 leading-tight mb-1.5 min-h-[28px]"
          >
            {{ product().name }}
          </h3>
        </a>
        <div class="flex items-center justify-between gap-1">
          <p class="text-xs sm:text-sm font-bold text-gray-900">
            KES {{ product().price | number }}
          </p>
          <!-- Rating -->
          <div class="flex items-center gap-0.5 text-[10px]">
            <svg class="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-gray-500 font-medium">{{ product().rating }}</span>
          </div>
        </div>
      </div>
    </div>
    }

    <!-- List Layout -->
    @if (layout() === 'list') {
    <div
      class="group flex bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      <a
        [routerLink]="['/product', product().id]"
        class="shrink-0 w-24 sm:w-32 bg-gray-50 relative overflow-hidden"
      >
        <div class="aspect-square overflow-hidden">
          <img
            [src]="product().image"
            [alt]="product().name"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <!-- Action Buttons -->
        <div
          class="absolute top-1 right-1 flex flex-col gap-0.5"
          (click)="$event.preventDefault(); $event.stopPropagation()"
        >
          <button
            (click)="onAddToCart()"
            class="p-1 bg-white/90 text-gray-700 hover:bg-gray-900 hover:text-white transition-all active:scale-90"
          >
            <svg
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            (click)="onToggleWishlist()"
            class="p-1 bg-white/90 text-gray-700 hover:text-red-500 transition-all active:scale-90"
            [class.text-red-500]="isInWishlist()"
          >
            <svg
              class="h-3 w-3"
              [attr.fill]="isInWishlist() ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </a>
      <div class="flex-1 p-3 flex flex-col justify-center">
        <p class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
          {{ product().category }}
        </p>
        <a [routerLink]="['/product', product().id]">
          <h3 class="text-xs font-medium text-gray-900 line-clamp-1 mb-1">{{ product().name }}</h3>
        </a>
        <div class="flex items-center justify-between">
          <p class="text-sm font-bold text-gray-900">KES {{ product().price | number }}</p>
          <div class="flex items-center gap-0.5 text-[10px]">
            <svg class="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-gray-500 font-medium">{{ product().rating }}</span>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  layout = input<'grid' | 'list'>('grid');

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  onAddToCart(): void {
    this.cartService.addToCart(this.product());
  }

  onToggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product());
  }

  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product().id);
  }
}
