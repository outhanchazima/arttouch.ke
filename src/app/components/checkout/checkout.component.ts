import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 class="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Left: Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Shipping Info -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 class="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</span>
              Shipping Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">First Name</label>
                <input type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Last Name</label>
                <input type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-medium text-slate-700">Address</label>
                <input type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">City</label>
                <input type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Postal Code</label>
                <input type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 class="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">2</span>
              Payment Method
            </h2>
            <div class="space-y-4">
              <label class="flex items-center gap-4 p-4 border border-indigo-600 bg-indigo-50 rounded-xl cursor-pointer">
                <input type="radio" name="payment" checked class="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                <span class="font-medium text-slate-900">Credit Card</span>
              </label>
              <label class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                <input type="radio" name="payment" class="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                <span class="font-medium text-slate-900">PayPal</span>
              </label>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-medium text-slate-700">Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Expiry Date</label>
                <input type="text" placeholder="MM/YY" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">CVC</label>
                <input type="text" placeholder="123" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-6 max-h-60 overflow-y-auto">
              @for (item of cartService.items(); track item.product.id) {
                <div class="flex gap-4">
                  <div class="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img [src]="item.product.image" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-slate-900 line-clamp-1">{{ item.product.name }}</h4>
                    <p class="text-xs text-slate-500">Qty: {{ item.quantity }}</p>
                    <p class="text-sm font-bold text-slate-900">\${{ item.product.price * item.quantity }}</p>
                  </div>
                </div>
              }
            </div>

            <div class="space-y-3 pt-6 border-t border-slate-100">
              <div class="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>\${{ cartService.subtotal() }}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Tax (10%)</span>
                <span>\${{ cartService.tax().toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-200">
                <span>Total</span>
                <span>\${{ cartService.total().toFixed(2) }}</span>
              </div>
            </div>

            <button class="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Place Order
            </button>
            
            <p class="mt-4 text-xs text-center text-slate-400">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
    cartService = inject(CartService);
}
