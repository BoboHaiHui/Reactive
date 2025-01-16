import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';

const canActivateWithRole = async (roleChecker: (userData: any) => boolean) => {
  const router = inject(Router);
  const profileService = inject(ProfileService);
  try {
    const profileUserData = await profileService.requestProfileUserData();
    if (!profileUserData) {
      router.navigate(['login']);
      return false;
    }
    if (roleChecker(profileUserData)) {
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

export const canActivateUser = async () => {
  const profileService = inject(ProfileService);
  return await canActivateWithRole(profileService.isUser);
};

export const canActivateAdmin = async () => {
  const profileService = inject(ProfileService);
  return await canActivateWithRole(profileService.isAdmin);
};

// export const canActivateLogin = async () => {
//   const router = inject(Router);
//   const profileService = inject(ProfileService);
//   if (profileService.isAdmin) {
//     await router.navigate(['/admin']);
//     return false;
//   }
//   if (profileService.isUser) {
//     await router.navigate(['/user']);
//     return false;
//   }
//   return true;
// };
