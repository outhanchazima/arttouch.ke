import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../components/product-card/product-card.component';

export interface FilterCriteria {
  categories: string[];
  colors: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

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
      colors: ['#1F2937', '#D1D5DB'],
    },
    {
      id: 5,
      name: 'Chromatic Waves',
      price: 300,
      image: 'https://picsum.photos/seed/art5/400/500',
      category: 'Acrylic',
      rating: 4.8,
      colors: ['#3B82F6', '#10B981'],
    },
    {
      id: 6,
      name: 'Minimalist Horizon',
      price: 95,
      image: 'https://picsum.photos/seed/art6/400/500',
      category: 'Print',
      rating: 4.6,
      colors: ['#F59E0B', '#EF4444'],
    },
    {
      id: 7,
      name: 'Retro Future',
      price: 150,
      image: 'https://picsum.photos/seed/art7/400/500',
      category: 'Digital Art',
      rating: 4.9,
      colors: ['#8B5CF6', '#EC4899'],
    },
    {
      id: 8,
      name: "Nature's Whisper",
      price: 210,
      image: 'https://picsum.photos/seed/art8/400/500',
      category: 'Photography',
      rating: 4.7,
      colors: ['#10B981', '#F59E0B'],
    },
    {
      id: 9,
      name: 'Cosmic Bloom',
      price: 275,
      image: 'https://picsum.photos/seed/art9/400/500',
      category: 'Oil Painting',
      rating: 4.8,
      colors: ['#3B82F6', '#1F2937'],
    },
    {
      id: 10,
      name: 'Vivid Motion',
      price: 130,
      image: 'https://picsum.photos/seed/art10/400/500',
      category: 'Acrylic',
      rating: 4.5,
      colors: ['#EF4444', '#EC4899'],
    },
  ]);

  // Derived state for filters
  readonly categories = computed(() => {
    const cats = new Set(this.products().map((p) => p.category));
    return Array.from(cats).sort();
  });

  readonly colors = computed(() => {
    const colors = new Set(
      this.products()
        .flatMap((p) => p.colors || [])
        .filter(Boolean)
    );
    return Array.from(colors);
  });

  readonly priceRange = computed(() => {
    const prices = this.products().map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  });

  getProducts() {
    return this.products.asReadonly();
  }

  filterProducts(products: Product[], criteria: FilterCriteria): Product[] {
    return products.filter((product) => {
      const matchesCategory =
        criteria.categories.length === 0 || criteria.categories.includes(product.category);

      const matchesColor =
        criteria.colors.length === 0 ||
        (product.colors && product.colors.some((c) => criteria.colors.includes(c)));

      const matchesPrice =
        (!criteria.minPrice || product.price >= criteria.minPrice) &&
        (!criteria.maxPrice || product.price <= criteria.maxPrice);

      return matchesCategory && matchesColor && matchesPrice;
    });
  }

  sortProducts(products: Product[], option: SortOption): Product[] {
    const sorted = [...products];
    switch (option) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
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
