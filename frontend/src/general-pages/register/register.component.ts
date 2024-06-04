import { ProfileService } from 'src/shared/services/profile.service';
import { IRegisterData } from 'src/shared/services/profile.service.interface';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;
  registerData: IRegisterData;
  userRegistered: boolean = false;
  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.max(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.max(30)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.max(30)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.max(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')
      ]),
      terms: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.registerData = {
      firstName: this.reactiveForm.value.firstName,
      lastName: this.reactiveForm.value.lastName,
      email: this.reactiveForm.value.email,
      password: this.reactiveForm.value.password,
      terms: this.reactiveForm.value.terms
    };
    this.register();
  }

  async register() {
    try {
      const url = 'http://localhost:4000/user/register';
      this.userRegistered = await this.profileService.register(url, this.registerData);
      if (this.userRegistered) {
        this.router.navigateByUrl(`activate-account/${this.registerData.email}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
