import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import {
  Constituency,
  County,
  Location,
  LocationService,
} from '../../services/location.service';
import { PaystackService } from '../../services/paystack.service';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, ContainerComponent],
  template: `
    <section class="py-12 lg:py-20 bg-gray-50 min-h-screen">
      <app-container>
        <h1 class="text-3xl font-serif font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        @if (cartService.items().length === 0) {
        <div class="text-center py-16 bg-white border border-gray-100 shadow-sm">
          <svg
            class="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 class="text-xl font-medium text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p class="text-gray-500 mb-6">Add some items to get started</p>
          <a
            routerLink="/store"
            class="inline-block px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
          >
            Continue Shopping
          </a>
        </div>
        } @else {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left: Forms -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Step 1: Delivery Location -->
            <div class="bg-white border border-gray-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="w-8 h-8 bg-orange-500 text-white flex items-center justify-center text-sm font-bold"
                  >1</span
                >
                <h2 class="text-xl font-semibold text-gray-900">
                  Delivery Location
                </h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Country -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="country"
                    >Country</label
                  >
                  <select
                    id="country"
                    [formControl]="checkoutForm.controls.country"
                    class="w-full px-4 py-3 border border-gray-300 bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all rounded-none"
                  >
                    @for (country of locationService.getCountries(); track
                    country.code) {
                    <option [value]="country.code">{{ country.name }}</option>
                    }
                  </select>
                </div>

                <!-- County -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="county"
                    >County</label
                  >
                  <select
                    id="county"
                    [formControl]="checkoutForm.controls.county"
                    class="w-full px-4 py-3 border border-gray-300 bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed rounded-none"
                    [class.text-gray-400]="!checkoutForm.controls.country.value"
                  >
                    <option value="">Select County</option>
                    @for (county of counties(); track county.id) {
                    <option [value]="county.id">{{ county.name }}</option>
                    }
                  </select>
                </div>

                <!-- Constituency -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="constituency"
                    >Constituency</label
                  >
                  <select
                    id="constituency"
                    [formControl]="checkoutForm.controls.constituency"
                    class="w-full px-4 py-3 border border-gray-300 bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed rounded-none"
                    [class.text-gray-400]="!checkoutForm.controls.county.value"
                  >
                    <option value="">Select Constituency</option>
                    @for (constituency of constituencies(); track
                    constituency.id) {
                    <option [value]="constituency.id">
                      {{ constituency.name }}
                    </option>
                    }
                  </select>
                </div>

                <!-- Location -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="location"
                    >Location/Area</label
                  >
                  <select
                    id="location"
                    [formControl]="checkoutForm.controls.location"
                    class="w-full px-4 py-3 border border-gray-300 bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed rounded-none"
                    [class.text-gray-400]="
                      !checkoutForm.controls.constituency.value
                    "
                  >
                    <option value="">Select Location</option>
                    @for (loc of locations(); track loc.id) {
                    <option [value]="loc.id">{{ loc.name }}</option>
                    }
                  </select>
                </div>

                <!-- Building -->
                <div class="md:col-span-2">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="building"
                    >Building/Apartment Name</label
                  >
                  <input
                    id="building"
                    type="text"
                    [formControl]="checkoutForm.controls.building"
                    placeholder="e.g., Westpark Towers, Floor 5, Unit 501"
                    class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-0 outline-none transition-all rounded-none"
                  />
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="instructions"
                    >Delivery Instructions</label
                  >
                  <textarea
                    id="instructions"
                    [formControl]="checkoutForm.controls.instructions"
                    rows="3"
                    placeholder="Any special delivery instructions (e.g., gate code, landmark, preferred delivery time)"
                    class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-0 outline-none transition-all resize-none rounded-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Step 2: Contact Details -->
            <div class="bg-white border border-gray-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="w-8 h-8 bg-orange-500 text-white flex items-center justify-center text-sm font-bold"
                  >2</span
                >
                <h2 class="text-xl font-semibold text-gray-900">
                  Contact Details
                </h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Phone -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="phone"
                    >Phone Number</label
                  >
                  <div class="flex">
                    <span
                      class="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                    >
                      {{ selectedCountryPhoneCode() }}
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      [formControl]="checkoutForm.controls.phone"
                      placeholder="712 345 678"
                      class="flex-1 px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-0 outline-none transition-all rounded-none"
                    />
                  </div>
                  @if (checkoutForm.controls.phone.invalid &&
                  checkoutForm.controls.phone.touched) {
                  <p class="mt-1 text-sm text-red-500">
                    Please enter a valid phone number
                  </p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 mb-2"
                    for="email"
                    >Email Address</label
                  >
                  <input
                    id="email"
                    type="email"
                    [formControl]="checkoutForm.controls.email"
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-0 outline-none transition-all rounded-none"
                  />
                  @if (checkoutForm.controls.email.invalid &&
                  checkoutForm.controls.email.touched) {
                  <p class="mt-1 text-sm text-red-500">
                    Please enter a valid email address
                  </p>
                  }
                </div>
              </div>
            </div>

            <!-- Step 3: Payment -->
            <div class="bg-white border border-gray-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="w-8 h-8 bg-orange-500 text-white flex items-center justify-center text-sm font-bold"
                  >3</span
                >
                <h2 class="text-xl font-semibold text-gray-900">Payment</h2>
              </div>

              <div class="space-y-4">
                <!-- Paystack Option -->
                <label
                  class="flex items-center gap-4 p-4 border border-orange-500 bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked
                    class="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500 rounded-none"
                  />
                  <div class="flex-1">
                    <span class="font-medium text-gray-900">Paystack</span>
                    <p class="text-sm text-gray-500">
                      Pay securely with card, M-Pesa, or bank transfer
                    </p>
                  </div>
                  <img
                    src="https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png"
                    alt="Paystack"
                    class="h-8 w-auto opacity-80"
                  />
                </label>
              </div>

              @if (paymentError()) {
              <div
                class="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {{ paymentError() }}
              </div>
              }
            </div>
          </div>

          <!-- Right: Order Summary -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <div class="bg-white border border-gray-100 shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div class="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  @for (item of cartService.items(); track item.product.id) {
                  <div class="flex gap-4">
                    <div
                      class="w-16 h-16 bg-gray-100 overflow-hidden shrink-0"
                    >
                      <img
                        [src]="item.product.image"
                        [alt]="item.product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4
                        class="text-sm font-medium text-gray-900 truncate"
                      >
                        {{ item.product.name }}
                      </h4>
                      <p class="text-xs text-gray-500">
                        Qty: {{ item.quantity }}
                      </p>
                      <p class="text-sm font-bold text-gray-900">
                        KES {{ item.product.price * item.quantity | number }}
                      </p>
                    </div>
                  </div>
                  }
                </div>

                <div class="space-y-3 pt-6 border-t border-gray-100">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {{ cartService.subtotal() | number }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>VAT (16%)</span>
                    <span>KES {{ cartService.tax() | number: '1.2-2' }}</span>
                  </div>
                  <div
                    class="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200"
                  >
                    <span>Total</span>
                    <span
                      >KES {{ cartService.total() | number: '1.2-2' }}</span
                    >
                  </div>
                </div>

                <div class="mt-8">
                  <button
                    (click)="processPayment()"
                    [disabled]="!isFormValid() || paystackService.isProcessing()"
                    class="w-full py-4 bg-[#111] text-white font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                  >
                    @if (paystackService.isProcessing()) {
                    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                    } @else { Pay with Paystack }
                  </button>
                </div>

                <p class="mt-4 text-xs text-center text-gray-400">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
        }
      </app-container>
    </section>
  `,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cartService = inject(CartService);
  locationService = inject(LocationService);
  paystackService = inject(PaystackService);

  paymentError = signal<string | null>(null);

  // Form
  checkoutForm = this.fb.group({
    // Location
    country: ['KE', Validators.required],
    county: ['', Validators.required],
    constituency: ['', Validators.required],
    location: ['', Validators.required],
    building: ['', Validators.required],
    instructions: [''],
    // Contact
    phone: ['', [Validators.required, Validators.pattern(/^\d{9,12}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Cascading dropdowns
  counties = computed<County[]>(() => {
    const countryCode = this.checkoutForm.controls.country.value;
    if (!countryCode) return [];
    return this.locationService.getCountiesByCountry(countryCode);
  });

  constituencies = computed<Constituency[]>(() => {
    const countryCode = this.checkoutForm.controls.country.value;
    const countyId = this.checkoutForm.controls.county.value;
    if (!countryCode || !countyId) return [];
    return this.locationService.getConstituenciesByCounty(countryCode, countyId);
  });

  locations = computed<Location[]>(() => {
    const countryCode = this.checkoutForm.controls.country.value;
    const countyId = this.checkoutForm.controls.county.value;
    const constituencyId = this.checkoutForm.controls.constituency.value;
    if (!countryCode || !countyId || !constituencyId) return [];
    return this.locationService.getLocationsByConstituency(
      countryCode,
      countyId,
      constituencyId
    );
  });

  selectedCountryPhoneCode = computed(() => {
    const countryCode = this.checkoutForm.controls.country.value;
    if (!countryCode) return '+254';
    const country = this.locationService.getCountryByCode(countryCode);
    return country?.phoneCode ?? '+254';
  });

  isFormValid = computed(() => this.checkoutForm.valid);

  constructor() {
    // Reset dependent fields when parent changes
    effect(() => {
      this.checkoutForm.controls.country.valueChanges.subscribe(() => {
        this.checkoutForm.controls.county.setValue('');
        this.checkoutForm.controls.constituency.setValue('');
        this.checkoutForm.controls.location.setValue('');
      });
    });

    effect(() => {
      this.checkoutForm.controls.county.valueChanges.subscribe(() => {
        this.checkoutForm.controls.constituency.setValue('');
        this.checkoutForm.controls.location.setValue('');
      });
    });

    effect(() => {
      this.checkoutForm.controls.constituency.valueChanges.subscribe(() => {
        this.checkoutForm.controls.location.setValue('');
      });
    });
  }

  async processPayment(): Promise<void> {
    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.paymentError.set(null);

    const email = this.checkoutForm.controls.email.value!;
    const amount = this.cartService.total();
    const reference = this.paystackService.generateReference();

    try {
      const response = await this.paystackService.pay({
        email,
        amount,
        reference,
        currency: 'KES',
        phone: this.checkoutForm.controls.phone.value ?? undefined,
        metadata: {
          county: this.checkoutForm.controls.county.value,
          constituency: this.checkoutForm.controls.constituency.value,
          location: this.checkoutForm.controls.location.value,
          building: this.checkoutForm.controls.building.value,
          instructions: this.checkoutForm.controls.instructions.value,
          items: this.cartService.items().map((item) => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      });

      // Payment successful
      console.log('Payment successful:', response);
      this.cartService.clearCart();
      // TODO: Navigate to success page or show success message
      alert('Payment successful! Reference: ' + response.reference);
    } catch (error) {
      if (error instanceof Error && error.message === 'Payment cancelled by user') {
        this.paymentError.set('Payment was cancelled. Please try again.');
      } else {
        this.paymentError.set('An error occurred. Please try again.');
      }
    }
  }
}
