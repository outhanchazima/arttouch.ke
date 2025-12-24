import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import {
  Constituency,
  County,
  Location,
  LocationService,
} from '../../services/location.service';
import { PaystackService } from '../../services/paystack.service';

@Component({
  selector: 'app-checkout-sidebar',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
      [class.opacity-0]="!cartService.isCheckoutOpen()"
      [class.pointer-events-none]="!cartService.isCheckoutOpen()"
      (click)="cartService.toggleCheckout()"
    ></div>

    <!-- Sidebar -->
    <div
      class="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      [class.translate-x-full]="!cartService.isCheckoutOpen()"
      [class.translate-x-0]="cartService.isCheckoutOpen()"
    >
      <!-- Header -->
      <div
        class="p-4 border-b border-gray-100 flex items-center justify-between bg-white"
      >
        <div class="flex items-center gap-3">
          <button
            (click)="goBackToCart()"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold text-gray-900">Checkout</h2>
        </div>
        <button
          (click)="cartService.toggleCheckout()"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <!-- Step Indicator -->
        <div class="flex items-center gap-2 mb-2">
          @for (step of [1, 2, 3]; track step) {
          <div class="flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              [class.bg-orange-500]="currentStep() >= step"
              [class.text-white]="currentStep() >= step"
              [class.bg-gray-200]="currentStep() < step"
              [class.text-gray-500]="currentStep() < step"
            >{{ step }}</span>
            @if (step < 3) {
            <div class="w-8 h-0.5" [class.bg-orange-500]="currentStep() > step" [class.bg-gray-200]="currentStep() <= step"></div>
            }
          </div>
          }
        </div>

        <!-- Step 1: Delivery Location -->
        @if (currentStep() === 1) {
        <div class="space-y-3">
          <h3 class="font-semibold text-gray-900">Delivery Location</h3>

          <!-- Country -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Country</label>
            <select
              [formControl]="checkoutForm.controls.country"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              @for (country of locationService.getCountries(); track country.code) {
              <option [value]="country.code">{{ country.name }}</option>
              }
            </select>
          </div>

          <!-- County -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">County</label>
            <select
              [formControl]="checkoutForm.controls.county"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select County</option>
              @for (county of counties(); track county.id) {
              <option [value]="county.id">{{ county.name }}</option>
              }
            </select>
          </div>

          <!-- Constituency -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Constituency</label>
            <select
              [formControl]="checkoutForm.controls.constituency"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select Constituency</option>
              @for (constituency of constituencies(); track constituency.id) {
              <option [value]="constituency.id">{{ constituency.name }}</option>
              }
            </select>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Location/Area</label>
            <select
              [formControl]="checkoutForm.controls.location"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select Location</option>
              @for (loc of locations(); track loc.id) {
              <option [value]="loc.id">{{ loc.name }}</option>
              }
            </select>
          </div>

          <!-- Building -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Building/Apartment</label>
            <input
              type="text"
              [formControl]="checkoutForm.controls.building"
              placeholder="e.g., Westpark Towers, Floor 5"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          <!-- Instructions -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Delivery Instructions (Optional)</label>
            <textarea
              [formControl]="checkoutForm.controls.instructions"
              rows="2"
              placeholder="Gate code, landmark, etc."
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
            ></textarea>
          </div>
        </div>
        }

        <!-- Step 2: Contact Details -->
        @if (currentStep() === 2) {
        <div class="space-y-3">
          <h3 class="font-semibold text-gray-900">Contact Details</h3>

          <!-- Phone -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
            <div class="flex">
              <span class="inline-flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 text-sm">
                {{ selectedCountryPhoneCode() }}
              </span>
              <input
                type="tel"
                [formControl]="checkoutForm.controls.phone"
                placeholder="712 345 678"
                class="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            @if (checkoutForm.controls.phone.invalid && checkoutForm.controls.phone.touched) {
            <p class="mt-1 text-xs text-red-500">Please enter a valid phone number</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              [formControl]="checkoutForm.controls.email"
              placeholder="you@example.com"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
            @if (checkoutForm.controls.email.invalid && checkoutForm.controls.email.touched) {
            <p class="mt-1 text-xs text-red-500">Please enter a valid email address</p>
            }
          </div>
        </div>
        }

        <!-- Step 3: Review & Pay -->
        @if (currentStep() === 3) {
        <div class="space-y-4">
          <h3 class="font-semibold text-gray-900">Review Order</h3>

          <!-- Order Items -->
          <div class="space-y-3 max-h-40 overflow-y-auto">
            @for (item of cartService.items(); track item.product.id) {
            <div class="flex gap-3">
              <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 truncate">{{ item.product.name }}</h4>
                <p class="text-xs text-gray-500">Qty: {{ item.quantity }} × KES {{ item.product.price | number }}</p>
              </div>
            </div>
            }
          </div>

          <!-- Delivery Summary -->
          <div class="bg-gray-50 rounded-lg p-3 text-sm">
            <p class="font-medium text-gray-900 mb-1">Delivering to:</p>
            <p class="text-gray-600 text-xs">
              {{ checkoutForm.controls.building.value }}<br>
              {{ getLocationName() }}, {{ getConstituencyName() }}<br>
              {{ getCountyName() }}
            </p>
          </div>

          @if (paymentError()) {
          <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ paymentError() }}
          </div>
          }
        </div>
        }
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100 bg-gray-50">
        <!-- Order Summary -->
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>KES {{ cartService.subtotal() | number }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>VAT (16%)</span>
            <span>KES {{ cartService.tax() | number: '1.2-2' }}</span>
          </div>
          <div class="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>KES {{ cartService.total() | number: '1.2-2' }}</span>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-3">
          @if (currentStep() > 1) {
          <button
            (click)="prevStep()"
            class="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          }
          @if (currentStep() < 3) {
          <button
            (click)="nextStep()"
            [disabled]="!canProceed()"
            class="flex-1 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
          } @else {
          <button
            (click)="processPayment()"
            [disabled]="paystackService.isProcessing()"
            class="flex-1 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            @if (paystackService.isProcessing()) {
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
            } @else {
            Pay with Paystack
            }
          </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class CheckoutSidebarComponent {
  private fb = inject(FormBuilder);

  cartService = inject(CartService);
  locationService = inject(LocationService);
  paystackService = inject(PaystackService);

  currentStep = signal(1);
  paymentError = signal<string | null>(null);

  checkoutForm = this.fb.group({
    country: ['KE', Validators.required],
    county: ['', Validators.required],
    constituency: ['', Validators.required],
    location: ['', Validators.required],
    building: ['', Validators.required],
    instructions: [''],
    phone: ['', [Validators.required, Validators.pattern(/^\d{9,12}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Signals to track form values for reactivity
  private selectedCountryCode = signal('KE');
  private selectedCountyId = signal('');
  private selectedConstituencyId = signal('');

  counties = computed<County[]>(() => {
    const countryCode = this.selectedCountryCode();
    if (!countryCode) return [];
    return this.locationService.getCountiesByCountry(countryCode);
  });

  constituencies = computed<Constituency[]>(() => {
    const countryCode = this.selectedCountryCode();
    const countyId = this.selectedCountyId();
    if (!countryCode || !countyId) return [];
    return this.locationService.getConstituenciesByCounty(countryCode, countyId);
  });

  locations = computed<Location[]>(() => {
    const countryCode = this.selectedCountryCode();
    const countyId = this.selectedCountyId();
    const constituencyId = this.selectedConstituencyId();
    if (!countryCode || !countyId || !constituencyId) return [];
    return this.locationService.getLocationsByConstituency(countryCode, countyId, constituencyId);
  });

  selectedCountryPhoneCode = computed(() => {
    const countryCode = this.selectedCountryCode();
    const country = this.locationService.getCountryByCode(countryCode ?? 'KE');
    return country?.phoneCode ?? '+254';
  });

  constructor() {
    // Subscribe to form changes and update signals
    this.checkoutForm.controls.country.valueChanges.subscribe((value) => {
      this.selectedCountryCode.set(value ?? 'KE');
      this.checkoutForm.controls.county.setValue('');
      this.checkoutForm.controls.constituency.setValue('');
      this.checkoutForm.controls.location.setValue('');
    });

    this.checkoutForm.controls.county.valueChanges.subscribe((value) => {
      this.selectedCountyId.set(value ?? '');
      this.checkoutForm.controls.constituency.setValue('');
      this.checkoutForm.controls.location.setValue('');
    });

    this.checkoutForm.controls.constituency.valueChanges.subscribe((value) => {
      this.selectedConstituencyId.set(value ?? '');
      this.checkoutForm.controls.location.setValue('');
    });
  }

  goBackToCart() {
    this.cartService.isCheckoutOpen.set(false);
    this.cartService.isOpen.set(true);
  }

  canProceed(): boolean {
    if (this.currentStep() === 1) {
      return (
        !!this.checkoutForm.controls.county.value &&
        !!this.checkoutForm.controls.constituency.value &&
        !!this.checkoutForm.controls.location.value &&
        !!this.checkoutForm.controls.building.value
      );
    }
    if (this.currentStep() === 2) {
      return (
        this.checkoutForm.controls.phone.valid &&
        this.checkoutForm.controls.email.valid
      );
    }
    return true;
  }

  nextStep() {
    if (this.canProceed() && this.currentStep() < 3) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  getCountyName(): string {
    const county = this.counties().find((c) => c.id === this.checkoutForm.controls.county.value);
    return county?.name ?? '';
  }

  getConstituencyName(): string {
    const constituency = this.constituencies().find(
      (c) => c.id === this.checkoutForm.controls.constituency.value
    );
    return constituency?.name ?? '';
  }

  getLocationName(): string {
    const location = this.locations().find((l) => l.id === this.checkoutForm.controls.location.value);
    return location?.name ?? '';
  }

  async processPayment(): Promise<void> {
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
          county: this.getCountyName(),
          constituency: this.getConstituencyName(),
          location: this.getLocationName(),
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

      console.log('Payment successful:', response);
      this.cartService.clearCart();
      this.cartService.isCheckoutOpen.set(false);
      this.currentStep.set(1);
      this.checkoutForm.reset({ country: 'KE' });
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
