import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { BlogService, BlogCategory } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <!-- Hero -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">Our Blog</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Insights & Resources
          </h1>
          <p class="text-gray-500 max-w-xl mx-auto">
            Expert advice, tips, and inspiration for parents, educators, and caregivers on early childhood development.
          </p>
        </div>
      </app-container>
    </section>

    <!-- Featured Post -->
    @if (featuredPost()) {
    <section class="py-12 bg-gray-50">
      <app-container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="aspect-video overflow-hidden">
            <img 
              [src]="featuredPost()!.image" 
              [alt]="featuredPost()!.title"
              class="w-full h-full object-cover"
            >
          </div>
          <div>
            <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">
              Featured Article
            </span>
            <h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
              {{ featuredPost()!.title }}
            </h2>
            <p class="text-gray-500 mb-6 leading-relaxed">
              {{ featuredPost()!.excerpt }}
            </p>
            <div class="flex items-center gap-4 mb-6">
              <img 
                [src]="featuredPost()!.author.avatar" 
                [alt]="featuredPost()!.author.name"
                class="w-10 h-10 rounded-full object-cover"
              >
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ featuredPost()!.author.name }}</p>
                <p class="text-xs text-gray-500">{{ featuredPost()!.publishedAt | date:'MMM d, yyyy' }} • {{ featuredPost()!.readTime }} min read</p>
              </div>
            </div>
            <a 
              [routerLink]="['/blog', featuredPost()!.slug]"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              Read Article
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </app-container>
    </section>
    }

    <!-- Category Filter & Posts -->
    <section class="py-20 bg-white">
      <app-container>
        <!-- Category Filter -->
        <div class="flex flex-wrap gap-3 mb-12 justify-center">
          <button 
            (click)="selectedCategory.set(null)"
            class="px-4 py-2 text-sm font-medium transition-colors border"
            [class.bg-[#111]]="!selectedCategory()"
            [class.text-white]="!selectedCategory()"
            [class.border-[#111]]="!selectedCategory()"
            [class.text-gray-600]="selectedCategory()"
            [class.border-gray-300]="selectedCategory()"
            [class.hover:border-gray-400]="selectedCategory()"
          >
            All Posts
          </button>
          @for (category of categories; track category.id) {
          <button 
            (click)="selectedCategory.set(category.name)"
            class="px-4 py-2 text-sm font-medium transition-colors border"
            [class.bg-[#111]]="selectedCategory() === category.name"
            [class.text-white]="selectedCategory() === category.name"
            [class.border-[#111]]="selectedCategory() === category.name"
            [class.text-gray-600]="selectedCategory() !== category.name"
            [class.border-gray-300]="selectedCategory() !== category.name"
            [class.hover:border-gray-400]="selectedCategory() !== category.name"
          >
            {{ category.name }} ({{ category.count }})
          </button>
          }
        </div>

        <!-- Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (post of filteredPosts(); track post.id) {
          <article class="group">
            <a [routerLink]="['/blog', post.slug]" class="block">
              <div class="aspect-video overflow-hidden mb-4">
                <img 
                  [src]="post.image" 
                  [alt]="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-xs text-gray-500">
                  <span class="text-orange-500 font-medium uppercase tracking-wider">{{ post.category }}</span>
                  <span>•</span>
                  <span>{{ post.publishedAt | date:'MMM d, yyyy' }}</span>
                </div>
                <h3 class="text-xl font-serif font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-gray-500 text-sm line-clamp-2">
                  {{ post.excerpt }}
                </p>
                <div class="flex items-center gap-3 pt-2">
                  <img 
                    [src]="post.author.avatar" 
                    [alt]="post.author.name"
                    class="w-8 h-8 rounded-full object-cover"
                  >
                  <span class="text-sm text-gray-600">{{ post.author.name }}</span>
                </div>
              </div>
            </a>
          </article>
          } @empty {
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500">No posts found in this category.</p>
          </div>
          }
        </div>
      </app-container>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-20 bg-[#111] text-white">
      <app-container>
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
          <p class="text-gray-400 mb-8">
            Subscribe to our newsletter for the latest articles, tips, and educational resources.
          </p>
          <div class="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-white/40"
            />
            <button class="px-6 py-3 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </app-container>
    </section>
  `,
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  posts = this.blogService.getPosts();
  categories = this.blogService.getCategories();
  selectedCategory = signal<string | null>(null);

  featuredPost = signal(this.blogService.getFeaturedPosts()[0] || null);

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Blog - Insights & Resources',
      description: 'Expert advice, tips, and inspiration for parents, educators, and caregivers on early childhood development, Montessori education, and special needs resources.',
      keywords: 'education blog, parenting tips, Montessori education, ECDE resources, early childhood development, Kenya education',
      ogUrl: 'https://arttouch.ke/blog',
      canonicalUrl: 'https://arttouch.ke/blog',
      type: 'website',
    });
  }

  filteredPosts = () => {
    const category = this.selectedCategory();
    if (!category) {
      return this.posts.filter((p) => p.id !== this.featuredPost()?.id);
    }
    return this.blogService.getPostsByCategory(category);
  };
}
