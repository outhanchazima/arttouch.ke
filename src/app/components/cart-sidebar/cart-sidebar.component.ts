import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      [class.translate-x-full]="!cartService.isOpen()"
      [class.translate-x-0]="cartService.isOpen()"
    >
      <!-- Header -->
      <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <h2 class="text-xl font-bold text-slate-900">Shopping Cart ({{ cartService.count() }})</h2>
        <button
          (click)="cartService.toggleCart()"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
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

      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        @if (cartService.items().length === 0) {
        <div class="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div
            class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
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
          </div>
          <div>
            <p class="text-lg font-medium text-slate-900">Your cart is empty</p>
            <p class="text-slate-500">Looks like you haven't added anything yet.</p>
          </div>
          <button
            (click)="cartService.toggleCart()"
            class="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Start Shopping
          </button>
        </div>
        } @else { @for (item of cartService.items(); track item.product.id) {
        <div class="flex gap-4">
          <div class="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
            <img
              [src]="item.product.image"
              [alt]="item.product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-slate-900 line-clamp-1">
                    {{ item.product.name }}
                  </h4>
                  <p class="text-xs text-slate-500">{{ item.product.category }}</p>
                  @if (item.selectedColor) {
                  <div class="flex items-center gap-1 mt-1">
                    <span class="text-xs text-slate-500">Color:</span>
                    <span
                      class="w-3 h-3 rounded-full border border-slate-200"
                      [style.background-color]="item.selectedColor"
                    ></span>
                  </div>
                  }
                </div>
                <button
                  (click)="cartService.removeFromCart(item.product.id, item.selectedColor)"
                  class="text-slate-400 hover:text-red-500 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex justify-between items-end mt-2">
                <div class="flex items-center border border-slate-200 rounded-lg">
                  <button
                    (click)="
                      cartService.updateQuantity(
                        item.product.id,
                        item.quantity - 1,
                        item.selectedColor
                      )
                    "
                    class="p-1 text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
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
                  <span class="px-2 text-xs font-medium text-slate-900">{{ item.quantity }}</span>
                  <button
                    (click)="
                      cartService.updateQuantity(
                        item.product.id,
                        item.quantity + 1,
                        item.selectedColor
                      )
                    "
                    class="p-1 text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
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
                <p class="text-sm font-bold text-slate-900">
                  \${{ item.product.price * item.quantity }}
                </p>
              </div>
            </div>
          </div>
        </div>
        } }
      </div>

      <!-- Footer -->
      @if (cartService.items().length > 0) {
      <div class="p-6 border-t border-slate-100 bg-slate-50">
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>\${{ cartService.subtotal() }}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Tax (10%)</span>
            <span>\${{ cartService.tax().toFixed(2) }}</span>
          </div>
          <div
            class="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-200"
          >
            <span>Total</span>
            <span>\${{ cartService.total().toFixed(2) }}</span>
          </div>
        </div>
        <app-button (onClick)="onCheckout()" [fullWidth]="true"> Proceed to Checkout </app-button>
      </div>
      }
    </div>
  `,
})
export class CartSidebarComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  onCheckout() {
    this.cartService.toggleCart();
    this.router.navigate(['/checkout']);
  }
}
