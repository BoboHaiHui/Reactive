import { Injectable } from '@angular/core';

import { IProfileUserData } from './profileUserData.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private userProfileData: IProfileUserData;

  setUserProfileData(userData: any){
    this.userProfileData = userData;
  }

  getUserProfileData(){
    return this.userProfileData;
  }
}