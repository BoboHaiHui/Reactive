import { ProfileService } from 'src/shared/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/shared/services/banner.service';

@Component({
  selector: 'app-MFA',
  templateUrl: './MFA.component.html',
  styleUrls: ['./MFA.component.css']
})
export class MFAComponent implements OnInit {
  activateCodeForm: FormGroup;
  unblockEmail: string | null;
  isResendDisabled: boolean = true;
  resendTimeout: any;
  resendCountdown: number = 120;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private bannerService: BannerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activateCodeForm = this.fb.group({
      activateCode: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{8,20}')]]
    });

    this.unblockEmail = this.activatedRoute.snapshot.paramMap.get('email');
    this.startResendTimer();
  }

  onSubmit() {
    if (this.activateCodeForm.valid && this.unblockEmail) {
      const activateCode = this.activateCodeForm.get('activateCode')?.value;
      this.profileService
        .unblock_account(this.unblockEmail, activateCode)
        .then(response => {
          if (response) {
            this.bannerService.showBanner('Account was unblocked', 'info');
          } else {
            this.bannerService.showBanner('Code is invalid', 'error');
          }
        })
        .catch(error => {
          console.error('Error during activation:', error);
        });
    } else {
      this.activateCodeForm.markAllAsTouched();
    }
  }

  resendCode() {
    const response = this.profileService.resendCode(this.unblockEmail);
    this.bannerService.showBanner('If the email exists, an email was send with the new unblock code!', 'info');
    this.startResendTimer();
  }

  startResendTimer() {
    this.isResendDisabled = true;
    this.resendCountdown = 120;

    this.resendTimeout = setInterval(() => {
      if (this.resendCountdown > 0) {
        this.resendCountdown--;
      } else {
        clearInterval(this.resendTimeout);
        this.isResendDisabled = false;
      }
    }, 1000);
  }
}
