import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';

export const userCanActivate = () => {
  const router = inject(Router);
  const profileService = inject(ProfileService);
  if (profileService.isUser()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
