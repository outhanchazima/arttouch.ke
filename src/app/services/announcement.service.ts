import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Announcement {
  message: string;
  phone: string;
  email: string;
  socials: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  // Signal to hold the current announcement
  announcement = signal<Announcement | null>(null);

  constructor() {
    this.fetchAnnouncement();
  }

  // Simulate API call
  fetchAnnouncement() {
    // In a real app, this would be an HTTP call
    const mockData: Announcement = {
      message: 'Get 10% off your first order',
      phone: '+254 723 709 005',
      email: 'info@arttouchke.com',
      socials: {
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
        facebook: 'https://facebook.com'
      },
      isActive: true
    };

    of(mockData).pipe(delay(500)).subscribe(data => {
      if (data.isActive) {
        this.announcement.set(data);
      }
    });
  }

  clearAnnouncement() {
    this.announcement.set(null);
  }
}
