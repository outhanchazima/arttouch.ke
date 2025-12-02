import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { InputDirective } from '../../shared/ui/input/input.directive';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    FormFieldComponent,
    InputDirective,
    ContainerComponent,
  ],
  template: `
    <app-container>
      <div class="py-12 lg:py-20">
        <h1 class="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Left: Form -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Shipping Info -->
            <app-card>
              <h2 class="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span
                  class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold"
                  >1</span
                >
                Shipping Information
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <app-form-field label="First Name">
                  <input type="text" appInput />
                </app-form-field>
                <app-form-field label="Last Name">
                  <input type="text" appInput />
                </app-form-field>
                <div class="md:col-span-2">
                  <app-form-field label="Address">
                    <input type="text" appInput />
                  </app-form-field>
                </div>
                <app-form-field label="City">
                  <input type="text" appInput />
                </app-form-field>
                <app-form-field label="Postal Code">
                  <input type="text" appInput />
                </app-form-field>
              </div>
            </app-card>

            <!-- Payment -->
            <app-card>
              <h2 class="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span
                  class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold"
                  >2</span
                >
                Payment Method
              </h2>
              <div class="space-y-4">
                <label
                  class="flex items-center gap-4 p-4 border border-indigo-600 bg-indigo-50 rounded-xl cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked
                    class="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span class="font-medium text-slate-900">Credit Card</span>
                </label>
                <label
                  class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="payment"
                    class="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span class="font-medium text-slate-900">PayPal</span>
                </label>
              </div>

              <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <app-form-field label="Card Number">
                    <input type="text" appInput placeholder="0000 0000 0000 0000" />
                  </app-form-field>
                </div>
                <app-form-field label="Expiry Date">
                  <input type="text" appInput placeholder="MM/YY" />
                </app-form-field>
                <app-form-field label="CVC">
                  <input type="text" appInput placeholder="123" />
                </app-form-field>
              </div>
            </app-card>
          </div>

          <!-- Right: Order Summary -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <app-card>
                <h2 class="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>

                <div class="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  @for (item of cartService.items(); track item.product.id) {
                  <div class="flex gap-4">
                    <div class="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      <img [src]="item.product.image" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1">
                      <h4 class="text-sm font-medium text-slate-900 line-clamp-1">
                        {{ item.product.name }}
                      </h4>
                      <p class="text-xs text-slate-500">Qty: {{ item.quantity }}</p>
                      <p class="text-sm font-bold text-slate-900">
                        \${{ item.product.price * item.quantity }}
                      </p>
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
                  <div
                    class="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-200"
                  >
                    <span>Total</span>
                    <span>\${{ cartService.total().toFixed(2) }}</span>
                  </div>
                </div>

                <div class="mt-8">
                  <app-button [fullWidth]="true"> Place Order </app-button>
                </div>

                <p class="mt-4 text-xs text-center text-slate-400">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </app-card>
            </div>
          </div>
        </div>
      </div>
    </app-container>
  `,
})
export class CheckoutComponent {
  cartService = inject(CartService);
}
