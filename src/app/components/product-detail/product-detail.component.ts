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
      <div class="py-8 lg:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <!-- Left: Image Gallery -->
          <div class="space-y-4 sticky top-24 self-start">
            <div
              class="aspect-4/5 w-full bg-slate-100 rounded-xl overflow-hidden relative group shadow-sm"
            >
              <img
                [src]="selectedImage()"
                [alt]="product().name"
                class="h-full w-full object-cover object-center transition-opacity duration-300"
                [class.opacity-0]="isImageLoading()"
                [class.opacity-100]="!isImageLoading()"
                (load)="onImageLoad()"
              />
              <!-- Zoom Hint -->
              <div
                class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center"
              >
                <span
                  class="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-slate-900 shadow-sm"
                >
                  Hover to zoom
                </span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-3">
              @for (img of images(); track img) {
              <button
                (click)="selectImage(img)"
                class="aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:opacity-100"
                [class.border-indigo-600]="selectedImage() === img"
                [class.border-transparent]="selectedImage() !== img"
                [class.opacity-70]="selectedImage() !== img"
                [class.scale-95]="selectedImage() !== img"
              >
                <img [src]="img" class="h-full w-full object-cover" />
              </button>
              }
            </div>
          </div>

          <!-- Right: Details -->
          <div class="flex flex-col justify-center">
            <div class="mb-6 border-b border-slate-100 pb-6">
              <div class="flex items-center gap-3 mb-3">
                <app-badge variant="accent">{{ product().category }}</app-badge>
                @if (product().rating >= 4.5) {
                <app-badge variant="glass" class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 fill-amber-400 text-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  Top Rated
                </app-badge>
                }
              </div>

              <h1
                class="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight leading-tight"
              >
                {{ product().name }}
              </h1>

              <div class="flex items-end gap-4 mb-4">
                <p class="text-3xl font-bold text-slate-900">\${{ product().price }}</p>
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="flex text-amber-400">
                    @for (star of [1,2,3,4,5]; track star) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      [class.fill-current]="star <= Math.round(product().rating)"
                      [class.text-slate-200]="star > Math.round(product().rating)"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    }
                  </div>
                  <span
                    class="text-slate-500 font-medium text-sm underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-indigo-600 transition-colors"
                    >120 reviews</span
                  >
                </div>
              </div>

              <p class="text-slate-600 text-base leading-relaxed">
                Experience the depth of emotion and color in this unique piece. Perfect for modern
                living spaces, this artwork brings a sense of calm and inspiration to any room.
                Hand-crafted with premium materials and attention to detail.
              </p>
            </div>

            <!-- Options -->
            <div class="space-y-6 mb-6">
              <!-- Color Selection -->
              @if (product().colors) {
              <div>
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-slate-900">Select Color</h3>
                  <span class="text-xs text-slate-500 font-medium">{{ selectedColor() }}</span>
                </div>
                <div class="flex gap-3">
                  @for (color of product().colors; track color) {
                  <button
                    (click)="selectedColor.set(color)"
                    class="group relative w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none"
                    [class.ring-2]="selectedColor() === color"
                    [class.ring-offset-2]="selectedColor() === color"
                    [class.ring-indigo-600]="selectedColor() === color"
                  >
                    <span
                      class="w-8 h-8 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-105"
                      [style.background-color]="color"
                    ></span>
                    @if (selectedColor() === color) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 absolute text-white drop-shadow-md"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    }
                  </button>
                  }
                </div>
              </div>
              }

              <!-- Quantity & Actions -->
              <div class="flex flex-col sm:flex-row gap-3">
                <div
                  class="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 w-max h-12"
                >
                  <button
                    (click)="decrementQty()"
                    class="p-2 text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
                    [disabled]="quantity() <= 1"
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
                  <span class="w-10 text-center font-semibold text-slate-900 text-sm">{{
                    quantity()
                  }}</span>
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
                  <app-button (onClick)="addToCart()" [fullWidth]="true" [disabled]="isAdding()">
                    <div class="flex items-center justify-center gap-2 text-sm">
                      @if (isAdding()) {
                      <svg
                        class="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding... } @else if (showAddedSuccess()) {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Added } @else {
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart }
                    </div>
                  </app-button>
                </div>

                <button
                  (click)="toggleWishlist()"
                  class="h-12 w-12 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-all active:scale-95"
                  [class.text-pink-500]="isInWishlist"
                  [class.border-pink-200]="isInWishlist"
                  [class.bg-pink-50]="isInWishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-transform duration-300"
                    [class.scale-110]="isInWishlist"
                    [class.fill-current]="isInWishlist"
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
            </div>

            <!-- Info Tabs -->
            <div class="border-t border-slate-100 pt-6">
              <div class="flex gap-6 border-b border-slate-100 mb-4">
                @for (tab of tabs; track tab) {
                <button
                  (click)="activeTab.set(tab)"
                  class="pb-3 text-sm font-semibold transition-colors relative"
                  [class.text-indigo-600]="activeTab() === tab"
                  [class.text-slate-500]="activeTab() !== tab"
                >
                  {{ tab }}
                  @if (activeTab() === tab) {
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"
                  ></span>
                  }
                </button>
                }
              </div>

              <div class="min-h-20 text-slate-600 leading-relaxed text-sm">
                @switch (activeTab()) { @case ('Description') {
                <p class="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  Each piece is a unique exploration of form and color, designed to evoke emotion
                  and spark conversation. Printed on archival quality canvas with fade-resistant
                  inks, ensuring your artwork remains vibrant for generations.
                </p>
                } @case ('Details') {
                <ul class="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <li class="flex justify-between py-2 border-b border-slate-50">
                    <span class="font-medium text-slate-900">Dimensions</span>
                    <span>24" x 36"</span>
                  </li>
                  <li class="flex justify-between py-2 border-b border-slate-50">
                    <span class="font-medium text-slate-900">Medium</span>
                    <span>Digital Print on Canvas</span>
                  </li>
                  <li class="flex justify-between py-2 border-b border-slate-50">
                    <span class="font-medium text-slate-900">Frame</span>
                    <span>Sustainable Oak Wood</span>
                  </li>
                </ul>
                } @case ('Shipping') {
                <div class="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div class="flex items-start gap-3">
                    <div class="p-1.5 bg-indigo-50 text-indigo-600 rounded-md shrink-0">
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-slate-900 text-sm">Free Global Shipping</h4>
                      <p class="text-xs mt-0.5">Delivery within 5-10 business days.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="p-1.5 bg-indigo-50 text-indigo-600 rounded-md shrink-0">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-slate-900 text-sm">30-Day Returns</h4>
                      <p class="text-xs mt-0.5">Not in love? Return it for a full refund.</p>
                    </div>
                  </div>
                </div>
                } }
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

  protected Math = Math;

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

  // UI State
  isImageLoading = signal(false);
  isAdding = signal(false);
  showAddedSuccess = signal(false);

  tabs = ['Description', 'Details', 'Shipping'];
  activeTab = signal('Description');

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

  selectImage(img: string) {
    if (this.selectedImage() === img) return;
    this.isImageLoading.set(true);
    this.selectedImage.set(img);
  }

  onImageLoad() {
    this.isImageLoading.set(false);
  }

  incrementQty() {
    this.quantity.update((q) => q + 1);
  }

  decrementQty() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart() {
    if (this.isAdding()) return;

    this.isAdding.set(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      for (let i = 0; i < this.quantity(); i++) {
        this.cartService.addToCart(this.product(), this.selectedColor());
      }

      this.isAdding.set(false);
      this.showAddedSuccess.set(true);

      // Reset success message after 2 seconds
      setTimeout(() => {
        this.showAddedSuccess.set(false);
      }, 2000);
    }, 600);
  }

  toggleWishlist() {
    this.wishlistService.toggleWishlist(this.product());
  }

  get isInWishlist() {
    return this.wishlistService.isInWishlist(this.product().id);
  }
}
