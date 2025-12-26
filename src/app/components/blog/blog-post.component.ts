import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';
import { BlogPost, BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    @if (post()) {
    <!-- Hero -->
    <section class="py-16 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto">
          <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>

          <span class="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4 block">
            {{ post()!.category }}
          </span>
          <h1 class="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {{ post()!.title }}
          </h1>

          <div class="flex items-center gap-4 mb-8">
            <img 
              [src]="post()!.author.avatar" 
              [alt]="post()!.author.name"
              class="w-12 h-12 rounded-full object-cover"
            >
            <div>
              <p class="font-medium text-gray-900">{{ post()!.author.name }}</p>
              <p class="text-sm text-gray-500">{{ post()!.author.role }}</p>
            </div>
            <div class="ml-auto text-right">
              <p class="text-sm text-gray-900">{{ post()!.publishedAt | date:'MMMM d, yyyy' }}</p>
              <p class="text-sm text-gray-500">{{ post()!.readTime }} min read</p>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Featured Image -->
    <section class="pb-12">
      <app-container>
        <div class="max-w-4xl mx-auto">
          <div class="aspect-video overflow-hidden">
            <img 
              [src]="post()!.image" 
              [alt]="post()!.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </app-container>
    </section>

    <!-- Content -->
    <section class="py-12 bg-white">
      <app-container>
        <div class="max-w-3xl mx-auto">
          <div 
            class="prose prose-lg prose-gray max-w-none"
            [innerHTML]="post()!.content"
          ></div>

          <!-- Tags -->
          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex flex-wrap gap-2">
              @for (tag of post()!.tags; track tag) {
              <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm">
                #{{ tag }}
              </span>
              }
            </div>
          </div>

          <!-- Author Bio -->
          <div class="mt-12 p-8 bg-gray-50 border border-gray-100">
            <div class="flex items-start gap-4">
              <img 
                [src]="post()!.author.avatar" 
                [alt]="post()!.author.name"
                class="w-16 h-16 rounded-full object-cover"
              >
              <div>
                <h4 class="font-bold text-gray-900 mb-1">{{ post()!.author.name }}</h4>
                <p class="text-sm text-gray-500 mb-3">{{ post()!.author.role }}</p>
                <p class="text-gray-600 text-sm">
                  Expert in early childhood education with years of experience helping parents and educators create better learning environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </app-container>
    </section>

    <!-- Related Posts -->
    @if (relatedPosts().length > 0) {
    <section class="py-20 bg-gray-50">
      <app-container>
        <div class="text-center mb-12">
          <h2 class="text-2xl font-serif font-bold text-gray-900">Related Articles</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (related of relatedPosts(); track related.id) {
          <article class="group">
            <a [routerLink]="['/blog', related.slug]" class="block">
              <div class="aspect-video overflow-hidden mb-4">
                <img 
                  [src]="related.image" 
                  [alt]="related.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
              </div>
              <span class="text-orange-500 text-xs font-medium uppercase tracking-wider">{{ related.category }}</span>
              <h3 class="text-lg font-serif font-bold text-gray-900 group-hover:text-orange-500 transition-colors mt-2">
                {{ related.title }}
              </h3>
            </a>
          </article>
          }
        </div>
      </app-container>
    </section>
    }
    } @else {
    <!-- Not Found -->
    <section class="py-20 bg-white">
      <app-container>
        <div class="text-center">
          <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p class="text-gray-500 mb-8">The article you're looking for doesn't exist.</p>
          <a routerLink="/blog" class="px-8 py-3 bg-[#111] text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide">
            Back to Blog
          </a>
        </div>
      </app-container>
    </section>
    }
  `,
  styles: [`
    :host ::ng-deep .prose h2 {
      font-size: 1.5rem;
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
      font-weight: 700;
      color: #111827;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }
    :host ::ng-deep .prose p {
      color: #4b5563;
      line-height: 1.75;
      margin-bottom: 1rem;
    }
    :host ::ng-deep .prose ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }
    :host ::ng-deep .prose li {
      color: #4b5563;
      margin-bottom: 0.5rem;
    }
    :host ::ng-deep .prose strong {
      color: #111827;
    }
  `],
})
export class BlogPostComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  post = signal<BlogPost | undefined>(undefined);
  relatedPosts = signal<BlogPost[]>([]);

  constructor() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        const post = this.blogService.getPostBySlug(slug);
        this.post.set(post);
        
        if (post) {
          this.relatedPosts.set(this.blogService.getRelatedPosts(slug));
          this.updateSeo(post);
        }
      }
    });
  }

  private updateSeo(post: BlogPost): void {
    this.seoService.updateTags({
      title: post.title,
      description: post.excerpt,
      keywords: post.tags.join(', '),
      ogTitle: post.title,
      ogDescription: post.excerpt,
      ogImage: post.image,
      ogUrl: `https://arttouch.ke/blog/${post.slug}`,
      canonicalUrl: `https://arttouch.ke/blog/${post.slug}`,
      type: 'article',
      author: post.author.name,
      publishedTime: new Date(post.publishedAt).toISOString(),
    });

    // Add article structured data
    const articleSchema = this.seoService.generateArticleStructuredData({
      title: post.title,
      description: post.excerpt,
      image: post.image,
      author: post.author.name,
      publishedDate: new Date(post.publishedAt).toISOString(),
    });
    this.seoService.addStructuredData(articleSchema);
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }
}
