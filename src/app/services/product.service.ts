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
  originalPrice?: number;
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
      name: 'Wooden Montessori Cylinder Block',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Montessori',
      rating: 4.9,
      colors: ['#D4C4A8', '#8B4513'],
      description:
        'A classic Montessori material that helps children develop visual discrimination of size. This set includes solid beechwood cylinders that vary in height and diameter, perfect for refining fine motor skills and preparing for writing.',
      details: [
        'Solid beechwood construction',
        'Non-toxic natural finish',
        'Set of 4 blocks with 10 cylinders each',
        'Develops dimension discrimination',
      ],
      shipping: 'Ships within 2-3 business days. Local delivery available.',
      dimensions: '45cm x 8cm x 7cm',
      material: 'Beechwood',
    },
    {
      id: 2,
      name: 'Sensory Water Beads Kit',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1596464716127-f9a8759fa069?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1596464716127-f9a8759fa069?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Sensory',
      rating: 4.7,
      colors: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
      description:
        'Engage your child\'s senses with our colorful Water Beads Kit. Perfect for sensory bins, these non-toxic beads expand in water to create a soothing tactile experience. Great for color sorting, counting, and imaginative play.',
      details: [
        'Non-toxic and biodegradable',
        'Includes 50g of dehydrated beads',
        'Comes with sorting tools',
        'Adult supervision required',
      ],
      shipping: 'Standard shipping (3-5 days).',
      dimensions: 'Packaged: 15cm x 10cm',
      material: 'Superabsorbent Polymer',
    },
    {
      id: 3,
      name: 'Wooden Rainbow Stacker',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Montessori',
      rating: 5.0,
      colors: ['#EF4444', '#F59E0B', '#FCD34D', '#10B981', '#3B82F6', '#8B5CF6'],
      description:
        'The iconic Wooden Rainbow Stacker is an open-ended toy that sparks creativity. Children can stack, nest, build tunnels, bridges, or fences. Handcrafted from sustainable wood and stained with non-toxic water-based dyes.',
      details: [
        '12-piece large rainbow',
        'Sustainably sourced lime wood',
        'Water-based non-toxic stain',
        'Encourages open-ended play',
      ],
      shipping: 'Free shipping on orders over KES 5000.',
      dimensions: '36cm x 17cm x 7cm',
      material: 'Lime Wood',
    },
    {
      id: 4,
      name: 'Child-Size Art Easel',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Art & Creative',
      rating: 4.8,
      colors: ['#D4C4A8'],
      description:
        'Unleash your little artist\'s potential with this double-sided Art Easel. Features a chalkboard on one side, a whiteboard on the other, and a paper roll holder on top. Adjustable height grows with your child.',
      details: [
        'Double-sided: Chalkboard & Whiteboard',
        'Adjustable height legs',
        'Includes paper roll and paint pots',
        'Foldable for easy storage',
      ],
      shipping: 'Flat packed. Assembly required.',
      dimensions: '120cm x 60cm',
      material: 'Pine Wood',
    },
    {
      id: 5,
      name: 'Inclusive Classroom Table',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Furniture',
      rating: 4.6,
      colors: ['#FFFFFF', '#D4C4A8'],
      description:
        'Designed for accessibility and collaboration, this kidney-shaped table allows teachers to work closely with small groups. Adjustable legs accommodate wheelchairs and different seating heights.',
      details: [
        'Scratch-resistant laminate top',
        'Adjustable steel legs',
        'Wheelchair accessible',
        'Seats up to 6 children',
      ],
      shipping: 'Freight shipping. Allow 1-2 weeks.',
      dimensions: '180cm x 90cm',
      material: 'Laminate & Steel',
    },
    {
      id: 6,
      name: 'Home Learning Starter Pack',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Kits',
      rating: 4.9,
      colors: ['#F3F4F6'],
      description:
        'Everything you need to set up a productive learning corner at home. Includes a small desk, chair, desk organizer, and a starter set of stationery and learning charts.',
      details: [
        'Ergonomic desk and chair set',
        'Includes wall charts (Alphabet, Numbers)',
        'Stationery organizer included',
        'Ideal for ages 3-6',
      ],
      shipping: 'Ships in 2 boxes.',
      dimensions: 'Various',
      material: 'Wood & Plastic',
    },
    {
      id: 7,
      name: 'Geometric Shape Puzzle',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Fine Motor',
      rating: 4.5,
      colors: ['#EF4444', '#3B82F6', '#F59E0B'],
      description:
        'A simple yet effective puzzle for introducing shapes and colors. Chunky knobs make it easy for little hands to grasp, promoting pincer grip development essential for writing.',
      details: [
        '3 distinct geometric shapes',
        'Large wooden knobs',
        'Smooth edges for safety',
        'Develops hand-eye coordination',
      ],
      shipping: 'Standard shipping.',
      dimensions: '30cm x 10cm',
      material: 'Plywood',
    },
    {
      id: 8,
      name: 'Therapy Sensory Swing',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596464716127-f9a8759fa069?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Special Needs',
      rating: 4.8,
      colors: ['#3B82F6', '#6366F1'],
      description:
        'A calming compression swing designed for children with sensory processing needs. Provides vestibular input and a sense of security. Can be used for therapy or relaxation.',
      details: [
        'Soft, stretchy nylon fabric',
        'Supports up to 80kg',
        'Includes mounting hardware',
        'Machine washable',
      ],
      shipping: 'Free shipping.',
      dimensions: 'Adjustable height',
      material: 'Nylon Spandex',
    },
    {
      id: 9,
      name: 'Natural Wood Building Blocks',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Construction',
      rating: 4.7,
      colors: ['#D4C4A8'],
      description:
        'A timeless set of 50 natural wooden blocks in various shapes. Building with blocks supports spatial awareness, problem-solving, and fine motor skills.',
      details: [
        '50 pieces in canvas bag',
        'Sanded smooth, no finish',
        'Various geometric shapes',
        'Compatible with other standard blocks',
      ],
      shipping: 'Standard shipping.',
      dimensions: 'Various',
      material: 'Rubberwood',
    },
    {
      id: 10,
      name: 'Number Tracing Board',
      price: 2100,
      image: 'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      ],
      category: 'Montessori',
      rating: 4.6,
      colors: ['#D4C4A8'],
      description:
        'Learn to write numbers 0-9 with this tactile wooden tracing board. Use the included stylus or a finger to trace the grooves, building muscle memory for correct number formation.',
      details: [
        'Double-sided (1-5, 6-10)',
        'Includes wooden stylus',
        'Durable hardwood',
        'Compact travel size',
      ],
      shipping: 'Standard shipping.',
      dimensions: '20cm x 15cm',
      material: 'Beechwood',
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
