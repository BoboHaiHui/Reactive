import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService } from 'src/shared/services/banner.service';
import { ProfileService } from 'src/shared/services/profile.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  reactiveForm: FormGroup;
  userEmail: string;

  constructor(private profileService: ProfileService, private bannerService: BannerService, private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({ email: new FormControl(null, [Validators.required, Validators.email, Validators.max(256)]) });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.requestResetPassword(this.reactiveForm.value.email);
      this.router.navigateByUrl('login');
      this.bannerService.showBanner('If an account exists with this name, check the inbox for details', 'info');
    }
    return;
  }

  requestResetPassword(email: string) {
    this.profileService.requestPasswordReset(email);
  }
}
