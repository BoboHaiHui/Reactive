import { ProfileService } from 'src/shared/services/profile.service';
import { ILoginData } from 'src/shared/services/profile.service.interface';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  loginData: ILoginData;

  constructor(private profileService: ProfileService) {}

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

  onSubmit() {
    this.loginData = {
      email: this.reactiveForm.value.email,
      password: this.reactiveForm.value.password
    };
    this.login();
  }

  login() {
    const url = 'http://localhost:4000/user/login';
    this.profileService.login(url, this.loginData);
  }
}
