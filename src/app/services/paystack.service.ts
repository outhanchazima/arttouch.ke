import { Injectable, signal } from '@angular/core';

export interface PaystackConfig {
  email: string;
  amount: number; // Amount in kobo/cents (will be multiplied by 100)
  reference?: string;
  currency?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  channels?: ('card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer' | 'apple_pay')[];
  metadata?: Record<string, unknown>;
}

export interface PaystackTransaction {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export interface PaystackLoadResponse {
  id: string;
  accessCode: string;
  customer: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const PaystackPop: any;

@Injectable({
  providedIn: 'root',
})
export class PaystackService {
  // TODO: Replace with your actual Paystack public key
  private publicKey = 'pk_test_b7d4448c94ccc32da7f817e1eda39d745c374585';

  isProcessing = signal(false);
  lastError = signal<string | null>(null);
  currentTransactionId = signal<string | null>(null);

  constructor() {
    this.loadPaystackScript();
  }

  private loadPaystackScript(): void {
    if (document.getElementById('paystack-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-script';
    // Using v2 inline.js as per latest Paystack docs
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () => {
      console.log('Paystack script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
    };
    document.head.appendChild(script);
  }

  generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `art_${timestamp}_${random}`;
  }

  /**
   * Initiate a payment using Paystack V2 InlineJS
   */
  pay(config: PaystackConfig): Promise<PaystackTransaction> {
    return new Promise((resolve, reject) => {
      this.isProcessing.set(true);
      this.lastError.set(null);
      this.currentTransactionId.set(null);

      // Check if PaystackPop is available (V2 exposes this globally)
      if (typeof PaystackPop === 'undefined') {
        console.error('PaystackPop is not defined');
        this.isProcessing.set(false);
        this.lastError.set('Paystack not loaded. Please refresh and try again.');
        reject(new Error('Paystack script not loaded'));
        return;
      }

      // Build transaction options - only include defined values
      const transactionOptions: Record<string, unknown> = {
        key: this.publicKey,
        email: config.email,
        amount: Math.round(config.amount * 100), // Convert to kobo/cents, ensure integer
        currency: config.currency ?? 'KES',
        reference: config.reference ?? this.generateReference(),
        onSuccess: (transaction: PaystackTransaction) => {
          console.log('Payment successful:', transaction);
          this.isProcessing.set(false);
          this.currentTransactionId.set(null);
          resolve(transaction);
        },
        onLoad: (response: PaystackLoadResponse) => {
          console.log('Transaction loaded:', response);
          this.currentTransactionId.set(response.id);
        },
        onCancel: () => {
          console.log('Payment cancelled by user');
          this.isProcessing.set(false);
          this.lastError.set('Payment cancelled');
          this.currentTransactionId.set(null);
          reject(new Error('Payment cancelled by user'));
        },
        onError: (error: { message: string }) => {
          console.error('Paystack error:', error);
          this.isProcessing.set(false);
          this.lastError.set(error.message);
          this.currentTransactionId.set(null);
          reject(new Error(error.message));
        },
      };

      // Only add optional fields if they have values
      if (config.firstName) transactionOptions['firstName'] = config.firstName;
      if (config.lastName) transactionOptions['lastName'] = config.lastName;
      if (config.phone) transactionOptions['phone'] = config.phone;
      if (config.channels && config.channels.length > 0) transactionOptions['channels'] = config.channels;
      if (config.metadata && Object.keys(config.metadata).length > 0) {
        transactionOptions['metadata'] = config.metadata;
      }

      console.log('Initiating Paystack payment:', {
        email: config.email,
        amount: transactionOptions['amount'],
        currency: transactionOptions['currency'],
        reference: transactionOptions['reference'],
      });

      try {
        const popup = new PaystackPop();
        popup.newTransaction(transactionOptions);
      } catch (err: unknown) {
        // Log full error details including issues array
        console.error('Error creating Paystack transaction:', err);
        if (err && typeof err === 'object' && 'issues' in err) {
          console.error('Paystack validation issues:', (err as { issues: unknown[] }).issues);
        }
        this.isProcessing.set(false);
        this.lastError.set('Failed to initialize payment. Please try again.');
        reject(err);
      }
    });
  }

  /**
   * Cancel a pending transaction
   */
  cancelCurrentTransaction(): void {
    const transactionId = this.currentTransactionId();
    if (transactionId) {
      try {
        const popup = new PaystackPop();
        popup.cancelTransaction(transactionId);
        this.currentTransactionId.set(null);
        this.isProcessing.set(false);
      } catch (err) {
        console.error('Error cancelling transaction:', err);
      }
    }
  }

  setPublicKey(key: string): void {
    this.publicKey = key;
  }
}
