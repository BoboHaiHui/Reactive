import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';

export const userCanActivate = async () => {
  const router = inject(Router);
  const profileService = inject(ProfileService);
  try {
    const profileUserData = await profileService.requestProfileUserData();
    if (!profileUserData) {
      router.navigate(['login']);
    }
    if (profileService.isUser(profileUserData)) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  } catch (error) {
    router.navigate(['login']);
    return false;
  }
};
