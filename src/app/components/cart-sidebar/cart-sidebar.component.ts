import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule, ButtonComponent],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
      [class.opacity-0]="!cartService.isOpen()"
      [class.pointer-events-none]="!cartService.isOpen()"
      (click)="cartService.toggleCart()"
    ></div>

    <!-- Sidebar -->
    <div
      class="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) flex flex-col"
      [class.translate-x-full]="!cartService.isOpen()"
      [class.translate-x-0]="cartService.isOpen()"
    >
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div class="flex items-center gap-3">
          <h2 class="text-3xl font-serif font-bold text-gray-900">Your Cart</h2>
          @if (cartService.count() > 0) {
            <span class="text-orange-500 font-serif text-lg italic">({{ cartService.count() }})</span>
          }
        </div>
        <button
          (click)="cartService.toggleCart()"
          class="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6 overscroll-contain">
        @if (cartService.items().length === 0) {
        <div class="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
          <div class="w-32 h-32 bg-gray-50 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
             </svg>
          </div>
          
          <div class="space-y-2 max-w-xs mx-auto">
            <h3 class="text-2xl font-serif font-bold text-gray-900">Your cart is empty</h3>
            <p class="text-gray-500 font-light">Looks like you haven't found the right art piece yet.</p>
          </div>
          
          <button
            (click)="cartService.toggleCart()"
            class="px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-all uppercase tracking-wide"
          >
            Start Exploring
          </button>
        </div>
        } @else { 
          <div class="space-y-6 pb-40">
            @for (item of cartService.items(); track item.product.id) {
            <div class="flex gap-6 group">
              <!-- Image -->
              <div class="w-20 h-28 bg-gray-100 shrink-0 overflow-hidden relative border border-gray-100">
                <img
                  [src]="item.product.image"
                  [alt]="item.product.name"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              <!-- Content -->
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div class="flex justify-between items-start gap-4">
                    <h4 class="text-base font-serif font-bold text-gray-900 leading-tight">
                      {{ item.product.name }}
                    </h4>
                    <button
                      (click)="cartService.removeFromCart(item.product.id, item.selectedColor)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span class="uppercase tracking-wider text-xs">{{ item.product.category }}</span>
                    @if (item.selectedColor) {
                      <span class="w-px h-3 bg-gray-300"></span>
                      <div class="flex items-center gap-2">
                        <span class="w-3 h-3 border border-gray-300" [style.background-color]="item.selectedColor"></span>
                      </div>
                    }
                  </div>
                </div>

                <div class="flex justify-between items-end mt-4">
                  <!-- Sharp Quantity Control -->
                  <div class="flex items-center border border-gray-300 h-8">
                    <button
                      (click)="cartService.updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)"
                      class="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border-r border-gray-300 disabled:opacity-30"
                      [disabled]="item.quantity <= 1"
                    >
                      −
                    </button>
                    <span class="w-10 text-center text-sm font-medium text-gray-900">{{ item.quantity }}</span>
                    <button
                      (click)="cartService.updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)"
                      class="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <!-- Price -->
                  <p class="text-base font-bold text-gray-900">
                    KES {{ (item.product.price * item.quantity) | number }}
                  </p>
                </div>
              </div>
            </div>
            <div class="h-px bg-gray-100 w-full"></div>
            }
          </div>
        }
      </div>

      <!-- Footer -->
      @if (cartService.items().length > 0) {
      <div class="p-8 border-t border-gray-100 bg-white/95 backdrop-blur-sm absolute bottom-0 left-0 right-0 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div class="space-y-3 mb-8">
          <div class="flex justify-between items-center text-gray-500 text-sm">
            <span>Subtotal</span>
            <span class="font-medium text-gray-900">KES {{ cartService.subtotal() | number }}</span>
          </div>
          <div class="flex justify-between items-center text-gray-500 text-sm">
            <span>VAT (16%)</span>
            <span class="font-medium text-gray-900">KES {{ cartService.tax() | number: '1.2-2' }}</span>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <span class="text-base font-serif font-bold text-gray-900">Total</span>
            <span class="text-2xl font-serif font-bold text-gray-900">KES {{ cartService.total() | number: '1.2-2' }}</span>
          </div>
        </div>
        <app-button (onClick)="onCheckout()" [fullWidth]="true">
          <span class="flex items-center gap-3 justify-center uppercase tracking-wide text-sm font-medium">
            Checkout
            <span class="text-lg">→</span>
          </span>
        </app-button>
      </div>
      }
    </div>
  `,
})
export class CartSidebarComponent {
  cartService = inject(CartService);

  onCheckout() {
    this.cartService.openCheckout();
  }
}
