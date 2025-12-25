import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-faq',
  imports: [CommonModule, ContainerComponent],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Help Center</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>
      </app-container>
    </section>

    <!-- FAQ Content -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="max-w-3xl mx-auto">
          @for (category of faqCategories; track category.title) {
          <div class="mb-12">
            <h2 class="text-xl font-serif font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              {{ category.title }}
            </h2>
            
            <div class="space-y-4">
              @for (item of category.items; track item.question) {
              <div class="bg-white border border-gray-100">
                <button
                  (click)="toggleItem(item.question)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ item.question }}</span>
                  <svg 
                    class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300"
                    [class.rotate-180]="openItem() === item.question"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                @if (openItem() === item.question) {
                <div class="px-6 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {{ item.answer }}
                </div>
                }
              </div>
              }
            </div>
          </div>
          }
        </div>

        <!-- Still Have Questions -->
        <div class="max-w-3xl mx-auto mt-12 bg-[#111] text-white p-8 md:p-12 text-center">
          <h3 class="text-2xl font-serif font-bold mb-4">Still Have Questions?</h3>
          <p class="text-gray-400 mb-6">Can't find what you're looking for? Our team is here to help.</p>
          <a href="/contact" class="inline-block px-8 py-3 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-wide">
            Contact Support
          </a>
        </div>
      </app-container>
    </section>
  `,
})
export class FaqComponent {
  openItem = signal<string | null>(null);

  toggleItem(question: string) {
    if (this.openItem() === question) {
      this.openItem.set(null);
    } else {
      this.openItem.set(question);
    }
  }

  faqCategories = [
    {
      title: 'Orders & Payment',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept M-Pesa, Visa, Mastercard, and bank transfers. All payments are processed securely through our payment partners.',
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. Please contact our support team immediately if you need to make changes.',
        },
        {
          question: 'Do you offer bulk discounts for schools?',
          answer: 'Yes! We offer special pricing for schools and educational institutions. Contact us for a custom quote based on your requirements.',
        },
      ],
    },
    {
      title: 'Shipping & Delivery',
      items: [
        {
          question: 'How long does delivery take?',
          answer: 'Nairobi deliveries take 1-2 business days. Other counties take 3-5 business days. We partner with reliable courier services for safe delivery.',
        },
        {
          question: 'Do you deliver outside Kenya?',
          answer: 'Currently, we only deliver within Kenya. We are working on expanding to other East African countries soon.',
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you will receive an SMS and email with tracking information. You can also track your order in your account dashboard.',
        },
      ],
    },
    {
      title: 'Returns & Refunds',
      items: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 7 days of delivery for unused items in original packaging. Educational materials and opened items cannot be returned for hygiene reasons.',
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact our support team with your order number and reason for return. We will provide return instructions and arrange pickup if applicable.',
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. M-Pesa refunds are typically faster.',
        },
      ],
    },
    {
      title: 'Products & Inventory',
      items: [
        {
          question: 'Are your products safe for children?',
          answer: 'Absolutely! All our products meet international safety standards. We only stock age-appropriate, non-toxic materials suitable for young children.',
        },
        {
          question: 'Can I request products not on your website?',
          answer: 'Yes! We have access to a wider catalog. Contact us with your specific requirements and we will check availability and pricing.',
        },
        {
          question: 'Do you offer product demonstrations?',
          answer: 'For schools and bulk buyers, we offer product demonstrations either at your location or via video call. Contact our sales team to schedule.',
        },
      ],
    },
  ];
}
