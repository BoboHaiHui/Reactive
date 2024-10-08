import { ProfileService } from 'src/shared/services/profile.service';
import { ILoginData } from 'src/shared/services/profile.service.interface';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/shared/validations/password.validator';
import { BannerService } from 'src/shared/services/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  loginData: ILoginData;
  hidePassword: boolean = true;

  constructor(private profileService: ProfileService, private bannerService: BannerService, private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.max(256)]),
      password: new FormControl(null, [Validators.required, PasswordValidator])
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmit() {
    if (this.reactiveForm.valid) {
      this.loginData = {
        email: this.reactiveForm.value.email,
        password: this.reactiveForm.value.password
      };
      await this.login();
    } else {
      this.bannerService.showBanner('Please fill in all fields correctly.', 'warning'); // Show warning if the form is invalid
    }
  }

  async login() {
    const url = 'http://localhost:4000/user/login';
    try {
      const response = await this.profileService.login(url, this.loginData);
      if (response.error.data === 'MFA required') {
        this.router.navigateByUrl(`MFA/${this.loginData.email}`);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      this.bannerService.showBanner('Login failed. Please check your credentials and try again.', 'error'); // Trigger the banner on failure
    }
  }
}
