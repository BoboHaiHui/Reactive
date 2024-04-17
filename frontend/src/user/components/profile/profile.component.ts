import { ProfileService } from 'src/shared/services/profile.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  reactiveForm: FormGroup;
  newProfileData: any;
  userRegistered: boolean = false;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.max(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.max(30)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.max(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')
      ])
    });
  }

  onSubmit() {
    this.newProfileData = {
      firstName: this.reactiveForm.value.firstName,
      lastName: this.reactiveForm.value.lastName,
      password: this.reactiveForm.value.password
    };
    this.changeProfileData();
  }

  changeProfileData() {
    //implement the logic
    return true;
  }
}
