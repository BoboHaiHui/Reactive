import { Component } from '@angular/core';
import { ProfileService } from 'src/shared/services/profile.service';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css']
})
export class SocialAuthComponent {
  constructor(private profileService: ProfileService) {}

  async socialAuth(socialPlatform: string) {
    try {
      const response = await this.profileService.socialAuth(socialPlatform);
    } catch (error) {
      console.error(`Login with ${socialPlatform} failed`);
    }
  }
}
