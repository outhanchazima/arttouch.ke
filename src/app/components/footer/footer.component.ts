import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../shared/ui/container/container.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ContainerComponent],
  template: `
    <footer class="bg-[#111] text-white pt-20 pb-20">
      <app-container>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Brand -->
          <div class="lg:col-span-1 space-y-6">
            <h3 class="text-2xl font-serif">
              <span class="text-orange-500">A</span>rtTouch
            </h3>
            <p class="text-gray-400 text-xs leading-relaxed max-w-xs">
              Dealers in teaching and learning resources for ECDE and Montessori. 
              Empowering every child, including those with special needs, through creative play and education.
            </p>
          </div>

          <!-- Service -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">Service</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">School Supply</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Home Learning</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Special Needs</a></li>
            </ul>
          </div>

          <!-- Our Benefit -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">Our Benefit</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Quality Assurance</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Expert Guidance</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Inclusive Design</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-sm font-bold text-white mb-6">Support</h4>
            <ul class="space-y-4 text-xs text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
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
      </app-container>
    </footer>
  `,
})
export class FooterComponent {}
