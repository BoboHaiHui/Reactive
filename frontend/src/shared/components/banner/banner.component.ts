import { Component, OnInit } from '@angular/core';
import { BannerService } from './../../services/banner.service';
import { IBanner } from './banner.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banner: IBanner = { message: '', isVisible: false, type: 'info' };

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.bannerService.bannerState$.subscribe((state: IBanner) => {
      this.banner = state;
    });
  }

  closeBanner() {
    this.banner.isVisible = false;
    this.bannerService.hideBanner(); // Optionally inform the service that the banner has been closed
  }
}
