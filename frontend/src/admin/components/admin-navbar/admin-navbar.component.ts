import { ProfileService } from 'src/shared/services/profile.service';
import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  userData: any;
  constructor(private profileStore: ProfileStore, private profileService: ProfileService) {}

  ngOnInit(): void {
    const userProfileData = this.profileStore.getUserProfileData();
    this.userData = userProfileData;
  }

  async logout() {
    await this.profileService.logout();
  }
}
