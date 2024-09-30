import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BannerType } from '../components/banner/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private bannerSubject = new BehaviorSubject<{ message: string; isVisible: boolean; type: BannerType }>({
    message: '',
    isVisible: false,
    type: 'info'
  });

  // Observable for components to subscribe to
  bannerState$ = this.bannerSubject.asObservable();

  showBanner(message: string, type: BannerType) {
    this.bannerSubject.next({ message, type, isVisible: true });
  }

  hideBanner() {
    this.bannerSubject.next({ message: '', type: 'info', isVisible: false });
  }
}
