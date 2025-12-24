import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // State
  private cartItems = signal<CartItem[]>([]);
  isOpen = signal<boolean>(false);
  isCheckoutOpen = signal<boolean>(false);

  // Computed
  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  subtotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  tax = computed(() => this.subtotal() * 0.16); // 16% VAT (Kenya)

  total = computed(() => this.subtotal() + this.tax());

  items = this.cartItems.asReadonly();

  // Actions
  addToCart(product: Product, color?: string) {
    this.cartItems.update((items) => {
      const existingItem = items.find(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1, selectedColor: color }];
    });
    this.isOpen.set(true); // Open cart when adding
  }

  removeFromCart(productId: number, color?: string) {
    this.cartItems.update((items) =>
      items.filter((item) => !(item.product.id === productId && item.selectedColor === color))
    );
  }

  updateQuantity(productId: number, quantity: number, color?: string) {
    if (quantity <= 0) {
      this.removeFromCart(productId, color);
      return;
    }

    this.cartItems.update((items) =>
      items.map((item) =>
        item.product.id === productId && item.selectedColor === color ? { ...item, quantity } : item
      )
    );
  }
  toggleCart() {
    this.isOpen.update((v: boolean) => !v);
  }

  toggleCheckout() {
    this.isCheckoutOpen.update((v: boolean) => !v);
  }

  openCheckout() {
    this.isOpen.set(false); // Close cart
    this.isCheckoutOpen.set(true); // Open checkout
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
