import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { Product } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ButtonComponent, BadgeComponent, ContainerComponent],
  template: `
    <app-container>
      <div class="py-12 lg:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <!-- Left: Image Gallery -->
          <div class="space-y-4">
            <div class="aspect-4/5 w-full bg-slate-100 rounded-3xl overflow-hidden relative group">
              <img
                [src]="selectedImage()"
                [alt]="product().name"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="grid grid-cols-4 gap-4">
              @for (img of images(); track img) {
              <button
                (click)="selectedImage.set(img)"
                class="aspect-square rounded-2xl overflow-hidden border-2 transition-all"
                [class.border-indigo-600]="selectedImage() === img"
                [class.border-transparent]="selectedImage() !== img"
              >
                <img [src]="img" class="h-full w-full object-cover" />
              </button>
              }
            </div>
          </div>

          <!-- Right: Details -->
          <div class="flex flex-col justify-center">
            <div class="mb-6">
              <app-badge variant="accent" class="mb-4">{{ product().category }}</app-badge>
              <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {{ product().name }}
              </h1>
              <div class="flex items-center gap-4 mb-6">
                <p class="text-3xl font-bold text-slate-900">\${{ product().price }}</p>
                <div class="flex items-center text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="ml-1 text-slate-500 font-medium"
                    >{{ product().rating }} (120 reviews)</span
                  >
                </div>
              </div>
              <p class="text-slate-600 text-lg leading-relaxed mb-8">
                Experience the depth of emotion and color in this unique piece. Perfect for modern
                living spaces, this artwork brings a sense of calm and inspiration to any room.
                Hand-crafted with premium materials and attention to detail.
              </p>
            </div>

            <!-- Color Selection -->
            @if (product().colors) {
            <div class="mb-8">
              <h3 class="text-sm font-medium text-slate-900 mb-4">Select Color</h3>
              <div class="flex gap-3">
                @for (color of product().colors; track color) {
                <button
                  (click)="selectedColor.set(color)"
                  class="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all"
                  [class.border-indigo-600]="selectedColor() === color"
                  [class.border-transparent]="selectedColor() !== color"
                >
                  <span
                    class="w-8 h-8 rounded-full border border-slate-200"
                    [style.background-color]="color"
                  ></span>
                </button>
                }
              </div>
            </div>
            }

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <div class="flex items-center border border-slate-200 rounded-full px-4 py-2 w-max">
                <button
                  (click)="decrementQty()"
                  class="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span class="px-4 font-semibold text-slate-900">{{ quantity() }}</span>
                <button
                  (click)="incrementQty()"
                  class="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex-1">
                <app-button (onClick)="addToCart()" [fullWidth]="true">
                  <div class="flex items-center justify-center gap-2">
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
                    Add to Cart
                  </div>
                </app-button>
              </div>

              <button
                (click)="toggleWishlist()"
                class="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                [class.text-pink-500]="isInWishlist"
                [class.border-pink-200]="isInWishlist"
                [class.bg-pink-50]="isInWishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 transition-transform group-hover:scale-110"
                  [attr.fill]="isInWishlist ? 'currentColor' : 'none'"
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

            <!-- Features -->
            <div class="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="font-medium text-slate-700">Authentic Art</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span class="font-medium text-slate-700">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-container>
  `,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  // Mock Product Data (In real app, fetch by ID)
  product = signal<Product>({
    id: 1,
    name: 'Abstract Harmony #1',
    price: 120,
    image: 'https://picsum.photos/seed/art1/600/800',
    category: 'Digital Art',
    rating: 4.9,
    colors: ['#4F46E5', '#EC4899', '#8B5CF6', '#10B981'],
  });

  images = signal<string[]>([
    'https://picsum.photos/seed/art1/600/800',
    'https://picsum.photos/seed/art1-detail1/600/800',
    'https://picsum.photos/seed/art1-detail2/600/800',
    'https://picsum.photos/seed/art1-detail3/600/800',
  ]);

  selectedImage = signal<string>(this.images()[0]);
  selectedColor = signal<string | undefined>(undefined);
  quantity = signal<number>(1);

  constructor() {
    // React to route params
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // Logic to fetch product by ID would go here
      // For now, we just reset the selected image
      this.selectedImage.set(this.images()[0]);
      if (this.product().colors?.length) {
        this.selectedColor.set(this.product().colors![0]);
      }
    });
  }

  incrementQty() {
    this.quantity.update((q) => q + 1);
  }

  decrementQty() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart() {
    for (let i = 0; i < this.quantity(); i++) {
      this.cartService.addToCart(this.product(), this.selectedColor());
    }
  }

  toggleWishlist() {
    this.wishlistService.toggleWishlist(this.product());
  }

  get isInWishlist() {
    return this.wishlistService.isInWishlist(this.product().id);
  }
}
