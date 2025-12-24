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
      class="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) flex flex-col"
      [class.translate-x-full]="!cartService.isCheckoutOpen()"
      [class.translate-x-0]="cartService.isCheckoutOpen()"
    >
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div class="flex items-center gap-3">
          <button
            (click)="goBackToCart()"
            class="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors"
            title="Back to Cart"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-2xl font-serif font-bold text-gray-900">Checkout</h2>
        </div>
        <button
          (click)="cartService.toggleCheckout()"
          class="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Step Indicator -->
      <div class="px-8 pt-6 pb-2 bg-white">
        <div class="flex items-center gap-2">
          @for (step of [1, 2, 3]; track step) {
            <div class="flex items-center gap-3" [class.flex-1]="step < 3">
              <div class="flex items-center gap-2">
                <span 
                  class="text-xs font-bold w-6 h-6 flex items-center justify-center border transition-colors duration-300"
                  [class.bg-[#111]]="currentStep() >= step"
                  [class.text-white]="currentStep() >= step"
                  [class.border-[#111]]="currentStep() >= step"
                  [class.text-gray-400]="currentStep() < step"
                  [class.border-gray-200]="currentStep() < step"
                >
                  {{ step }}
                </span>
                <span 
                  class="text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                  [class.text-gray-900]="currentStep() >= step"
                  [class.text-gray-400]="currentStep() < step"
                >
                  @if (step === 1) { Location }
                  @else if (step === 2) { Contact }
                  @else { Review }
                </span>
              </div>
              @if (step < 3) {
                <div class="h-px bg-gray-100 flex-1"></div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto px-8 py-6 space-y-8 pb-40 overscroll-contain">
        
        <!-- Step 1: Delivery Location -->
        @if (currentStep() === 1) {
        <div class="space-y-6 animate-fade-in">
          <div class="space-y-1">
            <h3 class="text-lg font-serif font-bold text-gray-900">Delivery Details</h3>
            <p class="text-sm text-gray-500">Enter your location for accurate pricing.</p>
          </div>

          <div class="grid gap-5">
            <!-- Country -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Country</label>
              <div class="relative">
                <select
                  [formControl]="checkoutForm.controls.country"
                  class="w-full pl-4 pr-10 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all appearance-none cursor-pointer rounded-none"
                >
                  @for (country of locationService.getCountries(); track country.code) {
                  <option [value]="country.code">{{ country.name }}</option>
                  }
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- County -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">County / State</label>
              <div class="relative">
                <select
                  [formControl]="checkoutForm.controls.county"
                  class="w-full pl-4 pr-10 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all appearance-none cursor-pointer rounded-none"
                >
                  <option value="">Select County</option>
                  @for (county of counties(); track county.id) {
                  <option [value]="county.id">{{ county.name }}</option>
                  }
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Constituency -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Constituency</label>
                <div class="relative">
                  <select
                    [formControl]="checkoutForm.controls.constituency"
                    class="w-full pl-4 pr-8 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all appearance-none cursor-pointer truncate rounded-none"
                  >
                    <option value="">Select</option>
                    @for (constituency of constituencies(); track constituency.id) {
                    <option [value]="constituency.id">{{ constituency.name }}</option>
                    }
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
  
              <!-- Location -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Area</label>
                <div class="relative">
                  <select
                    [formControl]="checkoutForm.controls.location"
                    class="w-full pl-4 pr-8 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all appearance-none cursor-pointer truncate rounded-none"
                  >
                    <option value="">Select</option>
                    @for (loc of locations(); track loc.id) {
                    <option [value]="loc.id">{{ loc.name }}</option>
                    }
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Building -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Building / Address</label>
              <input
                type="text"
                [formControl]="checkoutForm.controls.building"
                placeholder="e.g., Westpark Towers, Floor 5"
                class="w-full px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all placeholder:text-gray-400 rounded-none"
              />
            </div>

            <!-- Instructions -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Instructions (Optional)</label>
              <textarea
                [formControl]="checkoutForm.controls.instructions"
                rows="2"
                placeholder="Gate code, landmark, or special requests..."
                class="w-full px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all resize-none placeholder:text-gray-400 rounded-none"
              ></textarea>
            </div>
          </div>
        </div>
        }

        <!-- Step 2: Contact Details -->
        @if (currentStep() === 2) {
        <div class="space-y-6 animate-fade-in">
          <div class="space-y-1">
            <h3 class="text-lg font-serif font-bold text-gray-900">Contact Information</h3>
            <p class="text-sm text-gray-500">We'll use this for delivery updates.</p>
          </div>

          <div class="grid gap-5">
            <!-- Phone -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Phone Number</label>
              <div class="group flex relative">
                <span class="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-900 font-medium text-sm group-focus-within:border-[#111] transition-colors rounded-none">
                  {{ selectedCountryPhoneCode() }}
                </span>
                <input
                  type="tel"
                  [formControl]="checkoutForm.controls.phone"
                  placeholder="712 345 678"
                  class="flex-1 px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all placeholder:text-gray-400 rounded-none"
                />
              </div>
              @if (checkoutForm.controls.phone.invalid && checkoutForm.controls.phone.touched) {
              <p class="flex items-center gap-1 mt-1 text-xs text-red-500 font-medium animate-pulse">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Please enter a valid phone number
              </p>
              }
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-900 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                [formControl]="checkoutForm.controls.email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 text-sm border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all placeholder:text-gray-400 rounded-none"
              />
              @if (checkoutForm.controls.email.invalid && checkoutForm.controls.email.touched) {
              <p class="flex items-center gap-1 mt-1 text-xs text-red-500 font-medium animate-pulse">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Please enter a valid email address
              </p>
              }
            </div>
          </div>
        </div>
        }

        <!-- Step 3: Review & Pay -->
        @if (currentStep() === 3) {
        <div class="space-y-8 animate-fade-in">
          <div class="space-y-1">
            <h3 class="text-lg font-serif font-bold text-gray-900">Review & Pay</h3>
            <p class="text-sm text-gray-500">Please double check your details.</p>
          </div>

          <!-- Order Card -->
          <div class="border border-gray-200 p-6 space-y-4 bg-gray-50/30">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</h4>
            <div class="space-y-4 max-h-48 overflow-y-auto pr-1">
              @for (item of cartService.items(); track item.product.id) {
              <div class="flex gap-4 items-center">
                <div class="w-12 h-16 bg-gray-100 shrink-0 border border-gray-200">
                  <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-bold text-gray-900 truncate">{{ item.product.name }}</h4>
                  <p class="text-xs text-gray-500">{{ item.quantity }} x KES {{ item.product.price | number }}</p>
                </div>
                <div class="text-sm font-bold text-gray-900">
                  KES {{ (item.product.price * item.quantity) | number }}
                </div>
              </div>
              }
            </div>
          </div>

          <!-- Delivery Card -->
          <div class="border border-gray-200 p-6">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery To</h4>
              <button (click)="currentStep.set(1)" class="text-xs text-black font-bold border-b border-black hover:opacity-70">Edit</button>
            </div>
            <div class="text-sm text-gray-900 leading-relaxed font-light">
              <p class="font-medium mb-1">{{ checkoutForm.controls.building.value }}</p>
              <p class="text-gray-600">{{ getLocationName() }}, {{ getConstituencyName() }}</p>
              <p class="text-gray-600">{{ getCountyName() }}</p>
              @if (checkoutForm.controls.phone.value) {
                <p class="mt-3 text-gray-900 flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wide text-gray-400">Contact:</span>
                  {{ checkoutForm.controls.phone.value }}
                </p>
              }
            </div>
          </div>

          @if (paymentError()) {
          <div class="p-4 bg-red-50 border-l-2 border-red-500 flex gap-3 text-red-700 text-sm animate-fade-in">
             <span>⚠️</span>
             {{ paymentError() }}
          </div>
          }
        </div>
        }
      </div>

      <!-- Footer -->
      <div class="p-8 border-t border-gray-100 bg-white absolute bottom-0 left-0 right-0 z-20">
        <!-- Totals -->
        <div class="flex justify-between items-end mb-8">
          <div class="text-sm text-gray-500">
            <p>Total Amount</p>
            <p class="text-xs font-light">Includes Taxes</p>
          </div>
          <p class="text-2xl font-serif font-bold text-gray-900">KES {{ cartService.total() | number: '1.2-2' }}</p>
        </div>

        <!-- Navigation -->
        <div class="flex gap-4">
          @if (currentStep() > 1) {
          <button
            (click)="prevStep()"
            class="px-8 py-3 border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-colors uppercase text-sm tracking-wide"
          >
            Back
          </button>
          }
          
          @if (currentStep() < 3) {
          <button
            (click)="nextStep()"
            [disabled]="!canProceed()"
            class="flex-1 py-3 bg-[#111] text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wide"
          >
            Continue
          </button>
          } @else {
          <button
            (click)="processPayment()"
            [disabled]="paystackService.isProcessing()"
            class="flex-1 py-3 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
          >
            @if (paystackService.isProcessing()) {
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
            } @else {
             Pay Now
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
