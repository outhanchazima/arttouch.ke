import { Injectable, signal } from '@angular/core';
import { Product } from '../components/product-card/product-card.component';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private wishlistItems = signal<Product[]>([]);

    items = this.wishlistItems.asReadonly();

    toggleWishlist(product: Product) {
        this.wishlistItems.update(items => {
            const exists = items.some(item => item.id === product.id);
            if (exists) {
                return items.filter(item => item.id !== product.id);
            }
            return [...items, product];
        });
    }

    isInWishlist(productId: number) {
        return this.wishlistItems().some(item => item.id === productId);
    }
}
