import { ProfileService } from 'src/shared/services/profile.service';
import { ProfileStore } from 'src/shared/stores/profileUserData.store';

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
  constructor(private profileService: ProfileService, private profileStore: ProfileStore) {}

  ngOnInit(): void {
    let profileStoreData = this.profileStore.getUserProfileData();
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(profileStoreData.firstName, [Validators.max(30)]),
      lastName: new FormControl(profileStoreData.lastName, [Validators.max(30)]),
      oldPassword: new FormControl(null, [Validators.max(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')]),
      newPassword: new FormControl(null, [Validators.max(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')]),
      retypedPassword: new FormControl(null, [Validators.max(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')])
    });
  }

  async onSubmit() {
    this.newProfileData = {
      firstName: this.reactiveForm.value.firstName,
      lastName: this.reactiveForm.value.lastName,
      oldPassword: this.reactiveForm.value.oldPassword,
      newPassword: this.reactiveForm.value.newPassword,
      retypedPassword: this.reactiveForm.value.retypedPassword
    };
    return await this.changeProfileData(this.newProfileData, this.reactiveForm);
  }

  changeProfileData(newData, reactiveForm: FormGroup) {
    //toaster message with all the errors!!!
    if (reactiveForm.invalid) {
      throw new Error('Form group is not valid');
    }
    if (newData.newPassword) {
      if (!newData.oldPassword) {
        throw new Error('Old password is required');
      }
      if (newData.newPassword !== newData.retypedPassword) {
        throw new Error('passwords do not match');
      }
    }
    const response = this.profileService.updateProfileData(newData);
    return response;
  }
}
