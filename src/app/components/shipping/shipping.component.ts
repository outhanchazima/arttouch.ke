import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-shipping',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Policies</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Shipping & Returns
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about how we deliver your orders and handle returns.
          </p>
        </div>
      </app-container>
    </section>

    <!-- Content -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="max-w-3xl mx-auto">
          <!-- Shipping Info -->
          <div class="bg-white p-8 md:p-12 border border-gray-100 mb-8">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-6">Shipping Information</h2>
            
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Delivery Areas</h3>
                <p>We currently deliver to all 47 counties in Kenya. Nairobi and its environs enjoy priority delivery.</p>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Delivery Times</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li><strong>Nairobi CBD & Environs:</strong> 1-2 business days</li>
                  <li><strong>Nairobi Suburbs:</strong> 2-3 business days</li>
                  <li><strong>Major Towns:</strong> 3-4 business days</li>
                  <li><strong>Other Counties:</strong> 4-7 business days</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Shipping Costs</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li><strong>Orders above KES 5,000:</strong> Free delivery within Nairobi</li>
                  <li><strong>Nairobi deliveries:</strong> KES 200 - 500 depending on location</li>
                  <li><strong>Other counties:</strong> KES 300 - 1,000 depending on distance and weight</li>
                </ul>
                <p class="mt-2 text-sm">Exact shipping cost is calculated at checkout based on your location.</p>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Order Tracking</h3>
                <p>Once your order ships, you'll receive an SMS and email with tracking details. You can also track orders in your account dashboard.</p>
              </div>
            </div>
          </div>

          <!-- Returns Policy -->
          <div class="bg-white p-8 md:p-12 border border-gray-100 mb-8">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-6">Returns Policy</h2>
            
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Return Window</h3>
                <p>You have <strong>7 days</strong> from the date of delivery to initiate a return for eligible items.</p>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Eligible Items</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li>Items must be unused and in original packaging</li>
                  <li>All tags and labels must be intact</li>
                  <li>Items must be in resalable condition</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Non-Returnable Items</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li>Opened or used educational materials</li>
                  <li>Items marked as "Final Sale"</li>
                  <li>Personalized or custom-ordered items</li>
                  <li>Items damaged due to misuse</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">How to Return</h3>
                <ol class="list-decimal pl-5 space-y-2">
                  <li>Contact our support team at <strong>hello&#64;arttouch.ke</strong> with your order number</li>
                  <li>Describe the reason for return</li>
                  <li>Our team will provide return authorization and instructions</li>
                  <li>Ship the item back or arrange for pickup (for Nairobi)</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- Refunds -->
          <div class="bg-white p-8 md:p-12 border border-gray-100">
            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-6">Refunds</h2>
            
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Processing Time</h3>
                <p>Refunds are processed within <strong>5-7 business days</strong> after we receive and inspect the returned item.</p>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Refund Methods</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li><strong>M-Pesa:</strong> Refunded to the same number (1-2 business days)</li>
                  <li><strong>Card Payments:</strong> Refunded to the original card (5-7 business days)</li>
                  <li><strong>Bank Transfer:</strong> Refunded to provided account (3-5 business days)</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Shipping Costs</h3>
                <p>Original shipping costs are non-refundable unless the return is due to our error (wrong item, defective product, etc.).</p>
              </div>
            </div>
          </div>

          <!-- Contact CTA -->
          <div class="mt-12 text-center">
            <p class="text-gray-500 mb-4">Have questions about shipping or returns?</p>
            <a routerLink="/contact" class="inline-block px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide">
              Contact Support
            </a>
          </div>
        </div>
      </app-container>
    </section>
  `,
})
export class ShippingComponent {}
