import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-privacy',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Legal</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your information.
          </p>
          <p class="text-sm text-gray-400 mt-4">Last updated: December 2024</p>
        </div>
      </app-container>
    </section>

    <!-- Content -->
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="max-w-3xl mx-auto">
          <div class="bg-white p-8 md:p-12 border border-gray-100">
            <div class="prose prose-gray max-w-none">
              @for (section of sections; track section.title) {
              <div class="mb-10 pb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <h2 class="text-xl font-serif font-bold text-gray-900 mb-4">{{ section.title }}</h2>
                <div class="text-gray-600 leading-relaxed space-y-4">
                  @for (paragraph of section.content; track paragraph) {
                  <p>{{ paragraph }}</p>
                  }
                  @if (section.list) {
                  <ul class="list-disc pl-5 space-y-2">
                    @for (item of section.list; track item) {
                    <li>{{ item }}</li>
                    }
                  </ul>
                  }
                </div>
              </div>
              }
            </div>
          </div>

          <!-- Contact CTA -->
          <div class="mt-12 text-center">
            <p class="text-gray-500 mb-4">Questions about our privacy practices?</p>
            <a routerLink="/contact" class="inline-block px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide">
              Contact Us
            </a>
          </div>
        </div>
      </app-container>
    </section>
  `,
})
export class PrivacyComponent {
  sections = [
    {
      title: '1. Information We Collect',
      content: [
        'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.',
      ],
      list: [
        'Personal information (name, email, phone number, address)',
        'Payment information (processed securely via our payment partners)',
        'Order history and preferences',
        'Communication records with our support team',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'We use the information we collect to provide, maintain, and improve our services.',
      ],
      list: [
        'Process and fulfill your orders',
        'Send order confirmations and shipping updates',
        'Respond to your inquiries and provide customer support',
        'Send promotional communications (with your consent)',
        'Improve our products and services',
        'Detect and prevent fraud',
      ],
    },
    {
      title: '3. Information Sharing',
      content: [
        'We do not sell your personal information. We may share your information only in the following circumstances:',
      ],
      list: [
        'With delivery partners to fulfill your orders',
        'With payment processors to complete transactions',
        'With service providers who assist our operations',
        'When required by law or to protect our rights',
      ],
    },
    {
      title: '4. Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'All payment transactions are encrypted using SSL technology. We do not store your full credit card information on our servers.',
      ],
    },
    {
      title: '5. Your Rights',
      content: [
        'You have the right to access, update, or delete your personal information at any time.',
      ],
      list: [
        'Access your personal data through your account settings',
        'Request correction of inaccurate information',
        'Request deletion of your account and data',
        'Opt out of marketing communications',
        'Lodge a complaint with regulatory authorities',
      ],
    },
    {
      title: '6. Cookies',
      content: [
        'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content.',
        'You can control cookie preferences through your browser settings. Disabling cookies may affect some site functionality.',
      ],
    },
    {
      title: '7. Third-Party Links',
      content: [
        'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.',
      ],
    },
    {
      title: '8. Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email.',
        'Your continued use of our services after changes constitutes acceptance of the updated policy.',
      ],
    },
    {
      title: '9. Contact Us',
      content: [
        'If you have questions about this privacy policy or our data practices, please contact us at hello@arttouch.ke or through our contact page.',
      ],
    },
  ];
}
