import { Injectable, signal } from '@angular/core';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: Date;
  readTime: number;
  featured: boolean;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private isLoading = signal(false);
  private lastError = signal<string | null>(null);

  readonly loading = this.isLoading.asReadonly();
  readonly error = this.lastError.asReadonly();

  private posts: BlogPost[] = [
    {
      id: 1,
      slug: 'importance-of-sensory-play-early-childhood',
      title: 'The Importance of Sensory Play in Early Childhood Development',
      excerpt: 'Discover how sensory play activities can boost cognitive development, fine motor skills, and emotional regulation in young children.',
      content: '<p>Sensory play is any activity that stimulates a child senses: touch, smell, taste, sight, and hearing. Research shows that sensory play is crucial for brain development in the early years.</p><h2>Why Sensory Play Matters</h2><p>When children engage in sensory play, they build nerve connections in the brain pathways. This leads to a child ability to complete more complex learning tasks.</p><h2>Types of Sensory Play</h2><ul><li><strong>Tactile Play:</strong> Playing with different textures</li><li><strong>Vestibular Play:</strong> Activities involving movement and balance</li><li><strong>Proprioceptive Play:</strong> Activities that involve pressure and pushing</li></ul><h2>Conclusion</h2><p>Incorporating sensory play into your child daily routine does not have to be complicated. Start small and watch as they learn and grow.</p>',
      image: 'https://images.unsplash.com/photo-1587654780291-39c940483713?q=80&w=1000&auto=format&fit=crop',
      category: 'Child Development',
      author: {
        name: 'Sarah Mwangi',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop',
        role: 'Early Childhood Specialist',
      },
      publishedAt: new Date('2024-12-20'),
      readTime: 5,
      featured: true,
      tags: ['sensory play', 'development', 'ECDE', 'activities'],
    },
    {
      id: 2,
      slug: 'setting-up-montessori-classroom',
      title: 'A Complete Guide to Setting Up a Montessori Classroom',
      excerpt: 'Learn the key principles and practical tips for creating an effective Montessori learning environment.',
      content: '<p>The Montessori classroom is a carefully prepared environment designed to foster independence, concentration, and a love of learning.</p><h2>Key Principles</h2><p>A Montessori environment should be child-sized, organized, beautiful, and accessible. Every item should have a purpose and a place.</p><h2>Essential Areas</h2><ul><li><strong>Practical Life:</strong> Activities that develop independence</li><li><strong>Sensorial:</strong> Materials that refine the senses</li><li><strong>Language:</strong> Resources for reading and writing</li><li><strong>Mathematics:</strong> Concrete materials for mathematical concepts</li></ul><h2>Getting Started</h2><p>Start with a few quality materials in each area.</p>',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
      category: 'Montessori',
      author: {
        name: 'David Ochieng',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        role: 'Montessori Educator',
      },
      publishedAt: new Date('2024-12-15'),
      readTime: 8,
      featured: false,
      tags: ['montessori', 'classroom', 'setup', 'education'],
    },
    {
      id: 3,
      slug: 'supporting-children-with-special-needs',
      title: 'Inclusive Education: Supporting Children with Special Needs',
      excerpt: 'Practical strategies for creating an inclusive learning environment that supports all children.',
      content: '<p>Every child deserves access to quality education. Inclusive education ensures that children with special needs learn alongside their peers with appropriate support.</p><h2>Understanding Different Needs</h2><p>Children may have various learning differences including autism spectrum disorder, ADHD, dyslexia, and physical disabilities.</p><h2>Creating an Inclusive Environment</h2><ul><li>Adapt the physical space for accessibility</li><li>Use visual schedules and clear routines</li><li>Provide sensory-friendly areas</li><li>Offer multiple ways to learn</li></ul><h2>Resources and Support</h2><p>Work with specialists, therapists, and parents to create individualized plans.</p>',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      category: 'Special Needs',
      author: {
        name: 'Emily Wanjiku',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
        role: 'Special Education Advisor',
      },
      publishedAt: new Date('2024-12-10'),
      readTime: 6,
      featured: true,
      tags: ['special needs', 'inclusion', 'education', 'support'],
    },
    {
      id: 4,
      slug: 'choosing-right-learning-materials',
      title: 'How to Choose the Right Learning Materials for Your Child',
      excerpt: 'A guide to selecting age-appropriate educational resources that promote development.',
      content: '<p>With so many educational products on the market, choosing the right materials for your child can be overwhelming.</p><h2>Consider Age Appropriateness</h2><p>Materials should match your child developmental stage. Too easy and they will be bored; too difficult and they will be frustrated.</p><h2>Quality Over Quantity</h2><p>Invest in fewer, high-quality materials rather than many cheap ones.</p><h2>Open-Ended vs. Closed-Ended</h2><p>Open-ended toys and materials can be used in multiple ways, encouraging creativity and extended play.</p>',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      category: 'Parenting Tips',
      author: {
        name: 'Sarah Mwangi',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop',
        role: 'Early Childhood Specialist',
      },
      publishedAt: new Date('2024-12-05'),
      readTime: 4,
      featured: false,
      tags: ['parenting', 'materials', 'shopping', 'education'],
    },
  ];

  getPosts(): BlogPost[] {
    return this.posts;
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find((p) => p.slug === slug);
  }

  getFeaturedPosts(): BlogPost[] {
    return this.posts.filter((p) => p.featured);
  }

  getRecentPosts(limit = 3): BlogPost[] {
    return [...this.posts]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
    const current = this.getPostBySlug(currentSlug);
    if (!current) return [];

    return this.posts
      .filter((p) => p.slug !== currentSlug && p.category === current.category)
      .slice(0, limit);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.posts.filter((p) => p.category === category);
  }

  getCategories(): BlogCategory[] {
    const categoryMap = new Map<string, number>();

    this.posts.forEach((post) => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    }));
  }

  async fetchPosts(): Promise<BlogPost[]> {
    this.isLoading.set(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      return this.posts;
    } finally {
      this.isLoading.set(false);
    }
  }

  async fetchPostBySlug(slug: string): Promise<BlogPost | undefined> {
    this.isLoading.set(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 300));
      return this.getPostBySlug(slug);
    } finally {
      this.isLoading.set(false);
    }
  }
}
