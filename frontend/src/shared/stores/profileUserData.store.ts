import { Injectable } from '@angular/core';

import { IProfileUserData } from './profileUserData.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileStore {
  private userProfileData: IProfileUserData | null = null;

  setUserProfileData(userData: IProfileUserData): void {
    this.userProfileData = userData;
  }

  getUserProfileData(): IProfileUserData | null {
    return this.userProfileData;
  }

  clearUserProfileData(): void {
    this.userProfileData = null;
  }
}
