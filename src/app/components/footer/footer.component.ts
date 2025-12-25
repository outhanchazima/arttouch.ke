import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ContainerComponent, RouterLink],
  template: `
    <footer class="bg-[#111] text-white pt-20 pb-20">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Brand -->
          <div class="lg:col-span-1 space-y-6">
            <a routerLink="/" class="text-2xl font-serif">
              <span class="text-orange-500">A</span>rtTouch
            </a>
            <p class="text-gray-400 text-xs leading-relaxed max-w-xs">
              Dealers in teaching and learning resources for ECDE and Montessori. 
              Empowering every child, including those with special needs, through creative play and education.
            </p>
          </div>

          <!-- Service -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">Service</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a routerLink="/store" class="hover:text-white transition-colors">School Supply</a></li>
              <li><a routerLink="/store" class="hover:text-white transition-colors">Home Learning</a></li>
              <li><a routerLink="/store" class="hover:text-white transition-colors">Special Needs</a></li>
            </ul>
          </div>

          <!-- About -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">About</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a routerLink="/about" class="hover:text-white transition-colors">Our Story</a></li>
              <li><a routerLink="/about" class="hover:text-white transition-colors">Mission & Vision</a></li>
              <li><a routerLink="/about" class="hover:text-white transition-colors">Our Team</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">Support</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a routerLink="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
              <li><a routerLink="/faq" class="hover:text-white transition-colors">FAQs</a></li>
              <li><a routerLink="/shipping" class="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a routerLink="/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="lg:col-span-1">
            <h4 class="text-sm font-bold text-white mb-6">Join the ArtTouch Family</h4>
            <p class="text-gray-400 text-xs mb-4">
              Receive first access to the very best of educational resources and tips.
            </p>
            <div class="flex gap-2">
              <input
                type="email"
                placeholder="Add your email here"
                class="w-full px-4 py-3 bg-[#222] border border-[#333] text-white text-xs focus:outline-none focus:border-gray-500 placeholder-gray-500"
              />
              <button
                class="px-6 py-3 bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-16 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-gray-500">© 2024 ArtTouch. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>
      </app-container>
    </footer>
  `,
})
export class FooterComponent {}
