import { Injectable, signal } from '@angular/core';
import { Product } from '../components/product-card/product-card.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Abstract Harmony #1',
      price: 120,
      image: 'https://picsum.photos/seed/art1/400/500',
      category: 'Digital Art',
      rating: 4.9,
      colors: ['#3B82F6', '#EF4444', '#10B981'],
    },
    {
      id: 2,
      name: 'Neon Dreams',
      price: 250,
      image: 'https://picsum.photos/seed/art2/400/500',
      category: 'Photography',
      rating: 4.7,
      colors: ['#8B5CF6', '#EC4899'],
    },
    {
      id: 3,
      name: 'Geometric Flow',
      price: 85,
      image: 'https://picsum.photos/seed/art3/400/500',
      category: 'Print',
      rating: 4.5,
      colors: ['#F59E0B', '#3B82F6'],
    },
    {
      id: 4,
      name: 'Urban Solitude',
      price: 180,
      image: 'https://picsum.photos/seed/art4/400/500',
      category: 'Oil Painting',
      rating: 5.0,
    },
    {
      id: 5,
      name: 'Chromatic Waves',
      price: 300,
      image: 'https://picsum.photos/seed/art5/400/500',
      category: 'Acrylic',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Minimalist Horizon',
      price: 95,
      image: 'https://picsum.photos/seed/art6/400/500',
      category: 'Print',
      rating: 4.6,
    },
    {
      id: 7,
      name: 'Retro Future',
      price: 150,
      image: 'https://picsum.photos/seed/art7/400/500',
      category: 'Digital Art',
      rating: 4.9,
    },
    {
      id: 8,
      name: "Nature's Whisper",
      price: 210,
      image: 'https://picsum.photos/seed/art8/400/500',
      category: 'Photography',
      rating: 4.7,
    },
  ]);

  getProducts() {
    return this.products.asReadonly();
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products().filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }
}
