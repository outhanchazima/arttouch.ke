import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private readonly siteName = 'ArtTouch Kenya';
  
  // Optimized description with high-ranking keywords
  private readonly defaultDescription =
    'Shop quality CBC & Montessori learning materials in Kenya. ECDE educational toys, KICD approved curriculum resources, classroom supplies, sensory toys & special needs materials. Free delivery Nairobi.';
  
  // Research-backed keywords: Kenya focus + international educational toy terms
  private readonly defaultKeywords =
    // Primary Kenya market keywords
    'CBC learning materials Kenya, ECDE resources Kenya, Montessori toys Nairobi, educational toys Kenya, KICD approved books, ' +
    'preschool learning materials, nursery school supplies Kenya, classroom teaching aids, sensory toys Kenya, ' +
    'special needs education materials, early childhood development toys, pre-primary learning resources, ' +
    'Competency Based Curriculum materials, PP1 PP2 learning materials, Grade 1 2 3 CBC books, ' +
    // International educational toy keywords
    'Montessori materials online, educational toys for toddlers, wooden learning toys, STEM toys for kids, ' +
    'best educational toys 2024, early learning toys, developmental toys children, fine motor skills toys, ' +
    'educational games preschool, alphabet learning toys, counting toys toddlers, sensory play materials, ' +
    'classroom resources teachers, special needs toys, autism friendly toys, occupational therapy toys, ' +
    // African market keywords
    'educational toys Africa, learning materials East Africa, Montessori supplies Africa, ' +
    'school supplies wholesale Africa, bulk educational materials, teacher resources Africa';
  
  private readonly defaultImage = 'https://arttouch.ke/assets/og-image.jpg';
  private readonly siteUrl = 'https://arttouch.ke';

  updateTags(config: SeoConfig): void {
    // Set page title
    const fullTitle = `${config.title} | ${this.siteName}`;
    this.titleService.setTitle(fullTitle);

    // Basic meta tags
    this.setOrUpdateTag('description', config.description || this.defaultDescription);
    this.setOrUpdateTag('keywords', config.keywords || this.defaultKeywords);

    // Open Graph tags
    this.setOrUpdateTag('og:title', config.ogTitle || config.title, 'property');
    this.setOrUpdateTag('og:description', config.ogDescription || config.description, 'property');
    this.setOrUpdateTag('og:image', config.ogImage || this.defaultImage, 'property');
    this.setOrUpdateTag('og:url', config.ogUrl || this.siteUrl, 'property');
    this.setOrUpdateTag('og:type', config.type || 'website', 'property');
    this.setOrUpdateTag('og:site_name', this.siteName, 'property');

    // Twitter Card tags
    this.setOrUpdateTag('twitter:card', config.twitterCard || 'summary_large_image');
    this.setOrUpdateTag('twitter:title', config.ogTitle || config.title);
    this.setOrUpdateTag('twitter:description', config.ogDescription || config.description);
    this.setOrUpdateTag('twitter:image', config.ogImage || this.defaultImage);

    // Article specific tags
    if (config.type === 'article') {
      if (config.author) {
        this.setOrUpdateTag('article:author', config.author, 'property');
      }
      if (config.publishedTime) {
        this.setOrUpdateTag('article:published_time', config.publishedTime, 'property');
      }
      if (config.modifiedTime) {
        this.setOrUpdateTag('article:modified_time', config.modifiedTime, 'property');
      }
    }

    // Canonical URL
    if (config.canonicalUrl) {
      this.updateCanonicalUrl(config.canonicalUrl);
    }
  }

  private setOrUpdateTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    const selector = attribute === 'property' ? `property='${name}'` : `name='${name}'`;
    const existingTag = this.metaService.getTag(selector);

    if (existingTag) {
      this.metaService.updateTag({ [attribute]: name, content });
    } else {
      this.metaService.addTag({ [attribute]: name, content });
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  setDefaultTags(): void {
    this.updateTags({
      title: 'Montessori & ECDE Educational Resources',
      description: this.defaultDescription,
      keywords: this.defaultKeywords,
    });
  }

  generateProductStructuredData(product: {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
  }): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      },
      ...(product.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: 5,
        },
      }),
    };

    return JSON.stringify(structuredData);
  }

  generateArticleStructuredData(article: {
    title: string;
    description: string;
    image: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
  }): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.image,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ArtTouch Kenya',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arttouch.ke/assets/logo.png',
        },
      },
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate || article.publishedDate,
    };

    return JSON.stringify(structuredData);
  }

  generateFAQStructuredData(
    faqs: Array<{ question: string; answer: string }>
  ): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    return JSON.stringify(structuredData);
  }

  generateBreadcrumbStructuredData(
    items: Array<{ name: string; url: string }>
  ): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    return JSON.stringify(structuredData);
  }

  generateLocalBusinessStructuredData(): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'ArtTouch Kenya',
      description: this.defaultDescription,
      url: this.siteUrl,
      telephone: '+254723709005',
      email: 'hello@arttouch.ke',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.2921,
        longitude: 36.8219,
      },
      openingHours: 'Mo-Fr 09:00-18:00',
      priceRange: 'KES 100 - KES 50000',
    };

    return JSON.stringify(structuredData);
  }

  addStructuredData(jsonLd: string): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = jsonLd;
    document.head.appendChild(script);
  }

  removeStructuredData(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach((script) => script.remove());
  }
}
