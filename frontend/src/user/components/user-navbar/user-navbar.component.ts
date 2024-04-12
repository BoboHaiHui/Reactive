import { ProfileService } from 'src/shared/services/profile.service';
import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  userName: string;

  constructor(private profileStore: ProfileStore, private profileService: ProfileService) {
    const userProfileData = this.profileStore.getUserProfileData();
    this.userName = userProfileData ? userProfileData.firstName : '';
  }

  async logout() {
    await this.profileService.logout();
  }
}
