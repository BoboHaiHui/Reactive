import { ProfileService } from 'src/shared/services/profile.service';
import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/shared/services/banner.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  userData: any;
  constructor(private profileStore: ProfileStore, private profileService: ProfileService, private bannerService: BannerService) {}

  ngOnInit(): void {
    const userProfileData = this.profileStore.getUserProfileData();
    this.userData = userProfileData;
  }

  async logout() {
    const response = await this.profileService.logout();
    if (!response) {
      this.bannerService.showBanner('Logout Error! Session is still active', 'error');
    }
  }
}
