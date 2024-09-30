import { ProfileService } from 'src/shared/services/profile.service';
import { ILoginData } from 'src/shared/services/profile.service.interface';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BannerService } from 'src/shared/services/banner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  loginData: ILoginData;

  constructor(private profileService: ProfileService, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.max(30)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.max(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')
      ])
    });
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
      console.log('Login response:', response);
    } catch (error) {
      console.error('Login failed:', error.message);
      this.bannerService.showBanner('Login failed. Please check your credentials and try again.', 'error'); // Trigger the banner on failure
    }
  }
}
