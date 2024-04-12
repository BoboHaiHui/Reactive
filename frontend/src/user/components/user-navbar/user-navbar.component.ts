import { ProfileService } from 'src/shared/services/profile.service';
import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  userData: any;
  constructor(private profileStore: ProfileStore, private profileService: ProfileService) {}

  ngOnInit(): void {
    const userProfileData = this.profileStore.getUserProfileData();
    this.userData = userProfileData;
  }

  async logout() {
    await this.profileService.logout();
  }

  showUser() {
    console.log('UserData', this.userData);
    console.log('ProfileData', this.profileStore);
  }
}
