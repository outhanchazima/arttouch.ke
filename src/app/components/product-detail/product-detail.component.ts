import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product, ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ContainerComponent, ProductCardComponent, BadgeComponent],
  template: `
    <app-container>
      <div class="py-4 lg:py-12">
        <!-- Main Product Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-20">
          <!-- Left: Image Gallery -->
          <div class="space-y-4 lg:sticky lg:top-24 self-start">
            <div class="aspect-4/3 lg:aspect-square w-full bg-slate-50 rounded-lg overflow-hidden relative group">
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
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              @for (img of images(); track img) {
              <button
                (click)="selectImage(img)"
                class="w-20 h-20 rounded-lg overflow-hidden border transition-all duration-200 hover:opacity-100 shrink-0 snap-start"
                [class.border-slate-900]="selectedImage() === img"
                [class.border-transparent]="selectedImage() !== img"
                [class.opacity-60]="selectedImage() !== img"
              >
                <img [src]="img" class="h-full w-full object-cover" />
              </button>
              }
            </div>
          </div>

          <!-- Right: Details -->
          <div class="flex flex-col pt-2">
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

            <h1 class="text-2xl lg:text-3xl font-medium text-slate-900 mb-2 tracking-tight">
              {{ product().name }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex text-amber-400 text-sm">
                @for (star of [1,2,3,4,5]; track star) {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
              <span class="text-slate-400 text-xs">Be the first to review</span>
            </div>

            <div class="mb-6">
              <p class="text-2xl font-bold text-slate-900 mb-1">
                KES {{ product().price | number }}
              </p>
              <p class="text-xs text-slate-500">
                Availability: <span class="text-green-600 font-medium">In Stock</span>
              </p>
            </div>

            <!-- Specs & Description -->
            <div class="space-y-4 mb-8 text-sm text-slate-600">
              <!-- Product Details Tabs -->
              <div class="mb-20">
                <div class="border-b border-slate-200 mb-8 overflow-x-auto">
                  <div class="flex gap-8 min-w-max">
                    @for (tab of tabs; track tab) {
                    <button
                      (click)="activeTab.set(tab)"
                      class="pb-4 text-sm font-medium transition-colors relative"
                      [class.text-slate-900]="activeTab() === tab"
                      [class.text-slate-500]="activeTab() !== tab"
                    >
                      {{ tab }}
                      @if (activeTab() === tab) {
                      <span class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></span>
                      }
                    </button>
                    }
                  </div>
                </div>

                <div class="prose prose-slate max-w-none text-slate-600">
                  @if (activeTab() === 'Description') {
                  <p class="leading-relaxed">
                    {{ product().description || 'No description available.' }}
                  </p>
                  } @else if (activeTab() === 'Details') {
                  <ul class="list-disc pl-5 space-y-2">
                    @for (detail of product().details || []; track detail) {
                    <li>{{ detail }}</li>
                    } @empty {
                    <li>No details available.</li>
                    }
                  </ul>
                  <div class="mt-6 grid grid-cols-2 gap-4 max-w-md">
                    @if (product().dimensions) {
                    <div>
                      <span class="block text-xs text-slate-400 uppercase tracking-wider"
                        >Dimensions</span
                      >
                      <span class="text-slate-900">{{ product().dimensions }}</span>
                    </div>
                    } @if (product().material) {
                    <div>
                      <span class="block text-xs text-slate-400 uppercase tracking-wider"
                        >Material</span
                      >
                      <span class="text-slate-900">{{ product().material }}</span>
                    </div>
                    }
                  </div>
                  } @else if (activeTab() === 'Shipping') {
                  <p class="leading-relaxed">
                    {{ product().shipping || 'No shipping information available.' }}
                  </p>
                  }
                </div>
              </div>
            </div>

            <!-- Options -->
            <div class="space-y-6 mb-8 border-t border-slate-100 pt-6">
              <!-- Color Selection -->
              @if (product().colors) {
              <div>
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm text-slate-500">Color</h3>
                </div>
                <div class="flex gap-3">
                  @for (color of product().colors; track color) {
                  <button
                    (click)="selectedColor.set(color)"
                    class="group relative w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none ring-1 ring-slate-200"
                    [class.ring-2]="selectedColor() === color"
                    [class.ring-offset-2]="selectedColor() === color"
                    [class.ring-slate-900]="selectedColor() === color"
                  >
                    <span
                      class="w-full h-full rounded-full border border-white/10"
                      [style.background-color]="color"
                    ></span>
                  </button>
                  }
                </div>
              </div>
              } @else {
              <p class="text-sm text-slate-400 italic">No color options available</p>
              }

              <!-- Actions -->
              <div class="flex items-center gap-4">
                <!-- Quantity -->
                <div class="flex items-center bg-slate-100 rounded px-1 h-12">
                  <button
                    (click)="decrementQty()"
                    class="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30"
                    [disabled]="quantity() <= 1"
                  >
                    -
                  </button>
                  <span class="w-8 text-center font-medium text-slate-900 text-sm">{{
                    quantity()
                  }}</span>
                  <button
                    (click)="incrementQty()"
                    class="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    +
                  </button>
                </div>

                <!-- Add to Cart -->
                <button
                  (click)="addToCart()"
                  [disabled]="isAdding()"
                  class="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2 rounded"
                >
                  @if (isAdding()) {
                  <span>Adding...</span>
                  } @else if (showAddedSuccess()) {
                  <span>Added</span>
                  } @else {
                  <span>Add to cart</span>
                  }
                </button>

                <!-- Wishlist -->
                <button
                  (click)="toggleWishlist()"
                  class="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    [class.fill-current]="isInWishlist"
                    [class.text-red-500]="isInWishlist"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Products -->
        <div class="mb-20">
          <h2 class="text-xl font-medium text-slate-900 mb-8">Similar Products</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of similarProducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
            }
          </div>
        </div>

        <!-- Featured Products (Reusing similar products for demo) -->
        <div>
          <h2 class="text-xl font-medium text-slate-900 mb-8">Featured Products</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of featuredProducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
            }
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
  private productService = inject(ProductService);

  protected Math = Math;

  // Product Data
  product = signal<Product>({
    id: 0,
    name: '',
    price: 0,
    image: '',
    category: '',
    rating: 0,
    colors: [],
  });

  images = signal<string[]>([]);

  similarProducts = signal<Product[]>([]);

  featuredProducts = signal<Product[]>([]);

  selectedImage = signal<string>('');
  selectedColor = signal<string | undefined>(undefined);
  quantity = signal<number>(1);

  // UI State
  isImageLoading = signal(false);
  isAdding = signal(false);
  showAddedSuccess = signal(false);

  tabs = ['Description', 'Details', 'Shipping'];
  activeTab = signal('Description');

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'] ? Number(params['id']) : 1;
      this.loadProduct(id);
    });
  }

  private loadProduct(id: number) {
    const product = this.productService.getProductById(id);

    if (product) {
      this.product.set(product);

      // Set images
      if (product.images && product.images.length > 0) {
        this.images.set(product.images);
      } else {
        this.images.set([
          product.image,
          `https://picsum.photos/seed/${product.id}-extra1/600/800`,
          `https://picsum.photos/seed/${product.id}-extra2/600/800`,
          `https://picsum.photos/seed/${product.id}-extra3/600/800`,
        ]);
      }

      this.selectedImage.set(this.images()[0]);

      this.loadRelatedProducts(product.category);
    }
  }

  private loadRelatedProducts(category: string) {
    const allProducts = this.productService.getProducts()();

    // Filter for similar products (same category, excluding current)
    const similar = allProducts
      .filter((p) => p.category === category && p.id !== this.product().id)
      .slice(0, 4);

    this.similarProducts.set(similar);

    // For featured, just pick some random ones or top rated
    const featured = allProducts
      .filter((p) => p.id !== this.product().id)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    this.featuredProducts.set(featured);
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

    setTimeout(() => {
      for (let i = 0; i < this.quantity(); i++) {
        this.cartService.addToCart(this.product(), this.selectedColor());
      }

      this.isAdding.set(false);
      this.showAddedSuccess.set(true);

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
