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
  imports: [CommonModule, ContainerComponent, ProductCardComponent],
  template: `
    <!-- Main Product Section (Styled like Home Highlight) -->
    <section class="py-12 lg:py-20 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Left Controls (Decorative) -->
          <div class="hidden lg:flex lg:col-span-1 flex-col gap-8 items-center text-xs font-medium text-gray-400 pt-12">
            <span>01</span>
            <div class="h-16 w-px bg-gray-300"></div>
            <span>02</span>
            <span>03</span>
          </div>

          <!-- Main Image -->
          <div class="lg:col-span-5">
            <div class="aspect-3/4 bg-white p-4 shadow-xl relative">
              @if (product().rating >= 4.5) {
              <div class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 z-10">Top Rated</div>
              }
              
              <img 
                [src]="selectedImage()" 
                [alt]="product().name" 
                class="w-full h-full object-cover transition-opacity duration-300"
                [class.opacity-0]="isImageLoading()"
                [class.opacity-100]="!isImageLoading()"
                (load)="onImageLoad()"
              >
              
              <!-- Thumbnails (Desktop) -->
              <div class="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
                @for (img of images(); track img) {
                <div 
                  (click)="selectImage(img)"
                  class="w-12 h-16 bg-white shadow-md p-1 cursor-pointer hover:scale-110 transition-transform"
                  [class.ring-2]="selectedImage() === img"
                  [class.ring-orange-500]="selectedImage() === img"
                  [class.ring-transparent]="selectedImage() !== img"
                >
                  <img [src]="img" class="w-full h-full object-cover">
                </div>
                }
              </div>
            </div>
            
            <!-- Thumbnails (Mobile) -->
            <div class="flex lg:hidden gap-4 mt-6 overflow-x-auto pb-2">
               @for (img of images(); track img) {
                <div 
                  (click)="selectImage(img)"
                  class="w-16 h-20 bg-white shadow-md p-1 cursor-pointer shrink-0"
                  [class.ring-2]="selectedImage() === img"
                  [class.ring-orange-500]="selectedImage() === img"
                >
                  <img [src]="img" class="w-full h-full object-cover">
                </div>
                }
            </div>
          </div>

          <!-- Details -->
          <div class="lg:col-span-6 lg:pl-12">
            <span class="text-orange-500 text-sm font-medium mb-2 block">{{ product().category }} ✦</span>
            <h2 class="text-4xl font-serif font-bold text-gray-900 mb-4">{{ product().name }}</h2>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-6">
               <div class="flex text-yellow-400 text-sm">
                @for (star of [1,2,3,4,5]; track star) {
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" [class.fill-current]="star <= Math.round(product().rating)" [class.text-gray-300]="star > Math.round(product().rating)" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                }
              </div>
              <span class="text-gray-400 text-xs">({{ product().rating }} Reviews)</span>
            </div>

            <p class="text-gray-500 mb-8 max-w-md leading-relaxed">
              {{ product().description }}
            </p>
            
            <div class="flex items-center gap-4 mb-8">
              <span class="text-3xl font-bold text-gray-900">KES {{ product().price | number }}</span>
              <span class="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">In Stock</span>
            </div>

            <div class="mb-8">
              <p class="text-xs font-bold uppercase tracking-wider mb-3">Highlights</p>
              <div class="flex flex-wrap gap-3">
                @for (detail of product().details?.slice(0, 3); track detail) {
                <span class="px-3 py-1 border border-gray-300 text-xs font-medium rounded-full text-gray-600">{{ detail }}</span>
                }
              </div>
            </div>
            
            <!-- Colors -->
            @if (product().colors && product().colors!.length > 0) {
            <div class="mb-8">
               <p class="text-xs font-bold uppercase tracking-wider mb-3">Color</p>
               <div class="flex gap-3">
                  @for (color of product().colors; track color) {
                  <button
                    (click)="selectedColor.set(color)"
                    class="w-8 h-8 rounded-full border border-gray-200 focus:outline-none ring-2 ring-offset-2 transition-all"
                    [class.ring-gray-900]="selectedColor() === color"
                    [class.ring-transparent]="selectedColor() !== color"
                    [style.background-color]="color"
                  ></button>
                  }
               </div>
            </div>
            }

            <div class="flex flex-wrap gap-4">
               <!-- Quantity -->
               <div class="flex items-center border border-gray-300 h-[46px] bg-white">
                  <button (click)="decrementQty()" class="px-3 text-gray-500 hover:text-gray-900 h-full">-</button>
                  <span class="w-8 text-center font-medium text-gray-900 text-sm">{{ quantity() }}</span>
                  <button (click)="incrementQty()" class="px-3 text-gray-500 hover:text-gray-900 h-full">+</button>
               </div>

              <button 
                (click)="addToCart()"
                [disabled]="isAdding()"
                class="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors min-w-[140px]"
              >
                @if (isAdding()) { Adding... } @else if (showAddedSuccess()) { Added } @else { Add to Cart }
              </button>
              <button 
                (click)="toggleWishlist()"
                class="px-8 py-3 border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
                [class.text-red-500]="isInWishlist"
                [class.border-red-500]="isInWishlist"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Tabs & Additional Info -->
    <section class="py-12 bg-white">
       <app-container>
          <div class="mb-20 max-w-4xl mx-auto">
            <div class="border-b border-gray-200 mb-8 overflow-x-auto">
              <div class="flex gap-8 min-w-max justify-center">
                @for (tab of tabs; track tab) {
                <button
                  (click)="activeTab.set(tab)"
                  class="pb-4 text-sm font-medium transition-colors relative"
                  [class.text-gray-900]="activeTab() === tab"
                  [class.text-gray-500]="activeTab() !== tab"
                >
                  {{ tab }}
                  @if (activeTab() === tab) {
                  <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>
                  }
                </button>
                }
              </div>
            </div>

            <div class="prose prose-gray max-w-none text-gray-600 text-center">
              @if (activeTab() === 'Description') {
              <p class="leading-relaxed">
                {{ product().description || 'No description available.' }}
              </p>
              } @else if (activeTab() === 'Details') {
              <ul class="list-disc pl-5 space-y-2 text-left inline-block">
                @for (detail of product().details || []; track detail) {
                <li>{{ detail }}</li>
                } @empty {
                <li>No details available.</li>
                }
              </ul>
              <div class="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                @if (product().dimensions) {
                <div>
                  <span class="block text-xs text-gray-400 uppercase tracking-wider">Dimensions</span>
                  <span class="text-gray-900">{{ product().dimensions }}</span>
                </div>
                } @if (product().material) {
                <div>
                  <span class="block text-xs text-gray-400 uppercase tracking-wider">Material</span>
                  <span class="text-gray-900">{{ product().material }}</span>
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

          <!-- Similar Products -->
          <div class="mb-20">
            <h2 class="text-xl font-serif font-bold text-gray-900 mb-8">Similar Products</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              @for (product of similarProducts(); track product.id) {
              <app-product-card [product]="product"></app-product-card>
              }
            </div>
          </div>
       </app-container>
    </section>
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
