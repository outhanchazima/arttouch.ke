import { Injectable, computed, signal } from '@angular/core';

export interface FilterCriteria {
  categories: string[];
  colors: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  colors?: string[];
  description?: string;
  details?: string[];
  shipping?: string;
  dimensions?: string;
  material?: string;
}
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
      images: [
        'https://picsum.photos/seed/art1/400/500',
        'https://picsum.photos/seed/art1-detail1/400/500',
        'https://picsum.photos/seed/art1-detail2/400/500',
        'https://picsum.photos/seed/art1-room/400/500',
      ],
      category: 'Digital Art',
      rating: 4.9,
      colors: ['#3B82F6', '#EF4444', '#10B981'],
      description:
        'Experience the vibrant interplay of colors in "Abstract Harmony #1". This digital masterpiece captures the essence of modern fluidity, blending sharp geometric lines with soft, flowing gradients. Perfect for adding a touch of contemporary elegance to any living space or office.',
      details: [
        'High-quality digital print on archival paper',
        'Limited edition of 50 prints',
        'Signed and numbered by the artist',
        'Comes with a certificate of authenticity',
      ],
      shipping: 'Ships within 3-5 business days in a protective tube. Free shipping worldwide.',
      dimensions: '24" x 36"',
      material: 'Archival Matte Paper',
    },
    {
      id: 2,
      name: 'Neon Dreams',
      price: 250,
      image: 'https://picsum.photos/seed/art2/400/500',
      images: [
        'https://picsum.photos/seed/art2/400/500',
        'https://picsum.photos/seed/art2-detail1/400/500',
        'https://picsum.photos/seed/art2-detail2/400/500',
      ],
      category: 'Photography',
      rating: 4.7,
      colors: ['#8B5CF6', '#EC4899'],
      description:
        'Dive into the electric atmosphere of the city at night with "Neon Dreams". This photograph captures the pulse of urban life through a cyberpunk lens, featuring deep purples and vibrant pinks that seem to glow from within.',
      details: [
        'Printed on metallic paper for a luminous finish',
        'Mounted on a rigid backing',
        'Ready to hang with included hardware',
      ],
      shipping: 'Ships flat in a reinforced box. Delivery in 5-7 business days.',
      dimensions: '18" x 24"',
      material: 'Metallic Photo Paper',
    },
    {
      id: 3,
      name: 'Geometric Flow',
      price: 85,
      image: 'https://picsum.photos/seed/art3/400/500',
      images: [
        'https://picsum.photos/seed/art3/400/500',
        'https://picsum.photos/seed/art3-detail1/400/500',
      ],
      category: 'Print',
      rating: 4.5,
      colors: ['#F59E0B', '#3B82F6'],
      description:
        'A study in balance and form, "Geometric Flow" brings order to chaos. The warm amber tones contrast beautifully with cool blues, creating a dynamic visual anchor for any room.',
      details: ['Giclée print on cotton canvas', 'UV-resistant inks', 'Gallery wrapped edges'],
      shipping: 'Standard shipping (5-10 days). Expedited options available.',
      dimensions: '12" x 18"',
      material: 'Cotton Canvas',
    },
    {
      id: 4,
      name: 'Urban Solitude',
      price: 180,
      image: 'https://picsum.photos/seed/art4/400/500',
      images: [
        'https://picsum.photos/seed/art4/400/500',
        'https://picsum.photos/seed/art4-detail1/400/500',
        'https://picsum.photos/seed/art4-room/400/500',
      ],
      category: 'Oil Painting',
      rating: 5.0,
      colors: ['#1F2937', '#D1D5DB'],
      description:
        'An evocative oil painting that explores themes of isolation and beauty in the modern cityscape. The textured brushstrokes add depth and emotion to the monochromatic palette.',
      details: [
        'Original oil painting on stretched canvas',
        'Varnished for protection',
        'Unframed (framing recommended)',
      ],
      shipping: 'Crated and shipped via specialized art courier. Allow 2 weeks for delivery.',
      dimensions: '30" x 40"',
      material: 'Oil on Canvas',
    },
    {
      id: 5,
      name: 'Chromatic Waves',
      price: 300,
      image: 'https://picsum.photos/seed/art5/400/500',
      images: [
        'https://picsum.photos/seed/art5/400/500',
        'https://picsum.photos/seed/art5-detail1/400/500',
      ],
      category: 'Acrylic',
      rating: 4.8,
      colors: ['#3B82F6', '#10B981'],
      description:
        'Feel the energy of the ocean with "Chromatic Waves". This acrylic piece uses bold strokes and vibrant blues and greens to simulate the movement of water and light.',
      details: [
        'Original acrylic painting',
        'Heavy body acrylics for texture',
        'Painted on gallery-depth wood panel',
      ],
      shipping: 'Ships in a sturdy box with corner protection.',
      dimensions: '24" x 24"',
      material: 'Acrylic on Wood Panel',
    },
    {
      id: 6,
      name: 'Minimalist Horizon',
      price: 95,
      image: 'https://picsum.photos/seed/art6/400/500',
      images: [
        'https://picsum.photos/seed/art6/400/500',
        'https://picsum.photos/seed/art6-detail1/400/500',
      ],
      category: 'Print',
      rating: 4.6,
      colors: ['#F59E0B', '#EF4444'],
      description:
        'Simplicity is the ultimate sophistication. "Minimalist Horizon" uses a limited palette to evoke the warmth of a sunset over a calm landscape.',
      details: ['Fine art print', 'Matte finish', 'Sustainable paper source'],
      shipping: 'Rolled in a tube. 3-5 business days.',
      dimensions: '16" x 20"',
      material: 'Recycled Art Paper',
    },
    {
      id: 7,
      name: 'Retro Future',
      price: 150,
      image: 'https://picsum.photos/seed/art7/400/500',
      images: [
        'https://picsum.photos/seed/art7/400/500',
        'https://picsum.photos/seed/art7-detail1/400/500',
      ],
      category: 'Digital Art',
      rating: 4.9,
      colors: ['#8B5CF6', '#EC4899'],
      description:
        'A nostalgic look forward. "Retro Future" combines 80s aesthetics with futuristic concepts, creating a synthwave-inspired visual treat.',
      details: [
        'Digital illustration print',
        'High-gloss finish',
        'Vibrant colors guaranteed for 50 years',
      ],
      shipping: 'Flat packed. Express shipping available.',
      dimensions: '20" x 20"',
      material: 'Glossy Photo Paper',
    },
    {
      id: 8,
      name: "Nature's Whisper",
      price: 210,
      image: 'https://picsum.photos/seed/art8/400/500',
      images: [
        'https://picsum.photos/seed/art8/400/500',
        'https://picsum.photos/seed/art8-detail1/400/500',
      ],
      category: 'Photography',
      rating: 4.7,
      colors: ['#10B981', '#F59E0B'],
      description:
        'A macro photograph revealing the intricate details of a leaf. "Nature\'s Whisper" invites you to pause and appreciate the small wonders of the natural world.',
      details: [
        'Macro photography print',
        'Museum-quality paper',
        'Includes white border for framing',
      ],
      shipping: 'Ships in 3-5 days.',
      dimensions: '12" x 12"',
      material: 'Fine Art Paper',
    },
    {
      id: 9,
      name: 'Cosmic Bloom',
      price: 275,
      image: 'https://picsum.photos/seed/art9/400/500',
      images: [
        'https://picsum.photos/seed/art9/400/500',
        'https://picsum.photos/seed/art9-detail1/400/500',
      ],
      category: 'Oil Painting',
      rating: 4.8,
      colors: ['#3B82F6', '#1F2937'],
      description:
        'Where the galaxy meets the garden. "Cosmic Bloom" is a surreal oil painting depicting flowers composed of nebulae and stars.',
      details: ['Oil on canvas', 'Intricate detailing', 'Signed by the artist'],
      shipping: 'Insured shipping included.',
      dimensions: '24" x 30"',
      material: 'Oil on Canvas',
    },
    {
      id: 10,
      name: 'Vivid Motion',
      price: 130,
      image: 'https://picsum.photos/seed/art10/400/500',
      images: [
        'https://picsum.photos/seed/art10/400/500',
        'https://picsum.photos/seed/art10-detail1/400/500',
      ],
      category: 'Acrylic',
      rating: 4.5,
      colors: ['#EF4444', '#EC4899'],
      description:
        'Capturing the essence of dance and movement. "Vivid Motion" is full of energy, perfect for a creative workspace or lively living area.',
      details: ['Acrylic pour technique', 'Unique, one-of-a-kind pattern', 'High-gloss varnish'],
      shipping: 'Standard shipping.',
      dimensions: '18" x 24"',
      material: 'Acrylic on Canvas',
    },
    {
      id: 11,
      name: 'Silent Echoes',
      price: 160,
      image: 'https://picsum.photos/seed/art11/400/500',
      images: [
        'https://picsum.photos/seed/art11/400/500',
        'https://picsum.photos/seed/art11-detail1/400/500',
      ],
      category: 'Print',
      rating: 4.6,
      colors: ['#D1D5DB', '#F59E0B'],
      description:
        'A minimalist composition that speaks volumes. "Silent Echoes" uses negative space and subtle textures to create a calming atmosphere.',
      details: ['Minimalist art print', 'Textured paper', 'Neutral tones'],
      shipping: 'Ships in a tube.',
      dimensions: '20" x 30"',
      material: 'Textured Art Paper',
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

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
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
