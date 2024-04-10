import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileStore } from '../stores/profileUserData.store';
import { ILoginData, IRegisterData } from './profile.service.interface';

@Injectable()
export class ProfileService {
  constructor(private userProfileData: ProfileStore, private http: HttpClient, private router: Router) {}

  public login(url: string, loginData: ILoginData) {
    const userCredentials = {
      email: loginData.email,
      password: loginData.password
    };
    const options = { observe: 'response' as const, withCredentials: true };
    this.http.post(url, userCredentials, options).subscribe(
      (res: HttpResponse<any>) => {
        if (res.status == 201) {
          this.userProfileData.setUserProfileData(res.body?.userData);
        } else {
          console.log('Something went wrong. User was not been created');
        }
      },
      err => {
        throw console.error('Internal server error');
      }
    );
  }

  public async register(url: string, registerData: IRegisterData): Promise<boolean> {
    const userRegisterData = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      terms: registerData.terms
    };

    const options = { observe: 'response' as const };

    try {
      const res: HttpResponse<any> = await this.http.post(url, userRegisterData, options).toPromise();
      if (res.status == 201) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Internal server error', err);
      throw err;
    }
  }
}
