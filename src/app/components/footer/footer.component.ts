import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="bg-slate-900 text-white pt-16 pb-8 rounded-t-[3rem] mt-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <!-- Brand -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ArtTouch
            </h3>
            <p class="text-slate-400 leading-relaxed">
              Elevating spaces with curated modern art. We believe in the power of aesthetics to transform everyday life.
            </p>
            <div class="flex space-x-4 pt-2">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.087 1.777c-2.414.108-2.715.128-3.668.563-.653.313-1.153.812-1.466 1.466-.435.952-.455 1.253-.563 3.667v1.087c.108 2.414.128 2.715.563 3.668.313.653.812 1.153 1.466 1.466.952.435 1.253.455 3.667.563h1.087c2.414-.108 2.715-.128 3.668-.563.653-.313 1.153-.812 1.466-1.466.435-.952.455-1.253.563-3.667V9.222c-.108-2.414-.128-2.715-.563-3.668a3.965 3.965 0 00-1.466-1.466c-.952-.435-1.253-.455-3.667-.563h-1.087zm.043 4.076a5.335 5.335 0 110 10.67 5.335 5.335 0 010-10.67zm0 1.777a3.558 3.558 0 100 7.115 3.558 3.558 0 000-7.115zm5.88-5.37a1.185 1.185 0 110 2.37 1.185 1.185 0 010-2.37z" clip-rule="evenodd" /></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-6">Shop</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-6">Support</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-6">Stay in the Loop</h4>
            <p class="text-slate-400 mb-4 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form class="flex flex-col gap-3">
              <input type="email" placeholder="Enter your email" class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              <button type="button" class="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/30">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-500 text-sm">© 2025 ArtTouch. All rights reserved.</p>
          <div class="flex space-x-6">
            <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
