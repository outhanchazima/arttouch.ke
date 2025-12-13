import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (announcementService.announcement(); as data) {
      <div class="bg-black text-white text-xs md:text-sm py-2.5 relative z-50 transition-all duration-300">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            
            <!-- Left: Contact Info -->
            <div class="flex items-center gap-4 md:gap-6 order-2 md:order-1">
              <a [href]="'tel:' + data.phone" class="flex items-center gap-2 hover:text-orange-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.62l1.97-1.57c.23-.23.31-.56.25-.87-.36-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.46 3 3.9 3 4.46c0 9.27 7.55 16.82 16.82 16.82.55 0 .99-.45.99-.99v-3.91c0-.55-.45-.99-.99-.99z"/>
                </svg>
                <span>{{ data.phone }}</span>
              </a>
              <a [href]="'mailto:' + data.email" class="flex items-center gap-2 hover:text-orange-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>{{ data.email }}</span>
              </a>
            </div>

            <!-- Center: Message -->
            <div class="font-medium tracking-wide order-1 md:order-2 text-center">
              {{ data.message }}
            </div>

            <!-- Right: Socials -->
            <div class="flex items-center gap-4 order-3 md:order-3">
              <span class="hidden md:inline">Follow Us :</span>
              <div class="flex items-center gap-3">
                @if (data.socials.instagram) {
                  <a [href]="data.socials.instagram" target="_blank" class="hover:text-orange-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                  </a>
                }
                @if (data.socials.youtube) {
                  <a [href]="data.socials.youtube" target="_blank" class="hover:text-orange-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                    </svg>
                  </a>
                }
                @if (data.socials.facebook) {
                  <a [href]="data.socials.facebook" target="_blank" class="hover:text-orange-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"/>
                    </svg>
                  </a>
                }
              </div>
            </div>

            <!-- Close Button (Optional) -->
          <button (click)="announcementService.clearAnnouncement()" class="absolute right-4 text-white/60 hover:text-white transition-colors p-1" aria-label="Close announcement">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          </div>
        </div>
      </div>
    }
  `
})
export class AnnouncementBarComponent {
  announcementService = inject(AnnouncementService);
}
