import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      <!-- Background Blobs -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        ></div>
        <div
          class="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
        ></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span
          class="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100"
        >
          New Collection 2025
        </span>

        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
          Discover Art that <br />
          <span
            class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Touches Your Soul
          </span>
        </h1>

        <p class="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Curated collection of modern abstract art, digital masterpieces, and handcrafted
          sculptures designed to elevate your living space.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            class="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Shop Now
          </button>
          <button
            class="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
          >
            View Gallery
          </button>
        </div>

        <!-- Stats / Social Proof -->
        <div
          class="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div>
            <p class="text-3xl font-bold text-slate-900">2k+</p>
            <p class="text-slate-500 text-sm">Artworks</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">50+</p>
            <p class="text-slate-500 text-sm">Artists</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">98%</p>
            <p class="text-slate-500 text-sm">Happy Clients</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">24/7</p>
            <p class="text-slate-500 text-sm">Support</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `,
  ],
})
export class HeroComponent {}
