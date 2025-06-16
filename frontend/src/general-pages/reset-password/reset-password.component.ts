import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerService } from 'src/shared/services/banner.service';
import { ProfileService } from 'src/shared/services/profile.service';
import { IResetPassword } from 'src/shared/services/profile.service.interface';
import { PasswordValidator } from 'src/shared/validations/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  reactiveForm: FormGroup;
  hidePassword: boolean = true;
  resetPasswordData: IResetPassword;

  constructor(
    private profileService: ProfileService,
    private bannerService: BannerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup(
      {
        password: new FormControl(null, [Validators.required, PasswordValidator]),
        retypePassword: new FormControl(null, [Validators.required])
      },
      { validators: this.passwordMatchValidator }
    );
    this.resetPasswordData = {
      email: this.route.snapshot.queryParamMap.get('email'),
      resetCode: this.route.snapshot.queryParamMap.get('resetCode'),
      newPassword: ''
    };
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const retypePassword = form.get('retypePassword')?.value;
    return password && retypePassword && password !== retypePassword ? { passwordMismatch: true } : null;
  }

  async onSubmit() {
    if (this.reactiveForm.valid) {
      await this.resetPassword();
    } else {
      this.bannerService.showBanner('Please fill in all fields correctly.', 'warning');
    }
  }

  async resetPassword() {
    this.resetPasswordData.newPassword = this.reactiveForm.value.password;
    await this.profileService.resetPassword(this.resetPasswordData);
    this.router.navigateByUrl('login');
  }
}
