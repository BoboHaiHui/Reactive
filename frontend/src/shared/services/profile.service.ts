import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileStore } from '../stores/profileUserData.store';
import { ILoginData, IRegisterData } from './profile.service.interface';

@Injectable()
export class ProfileService {
  constructor(private profileStore: ProfileStore, private http: HttpClient, private router: Router) {}

  public async login(url: string, loginData: ILoginData): Promise<void> {
    const userCredentials: ILoginData = {
      email: loginData.email,
      password: loginData.password
    };
    const options = { observe: 'response' as const, withCredentials: true };
    try {
      const res: HttpResponse<any> = await this.http.post(url, userCredentials, options).toPromise();

      if (res.status === 201) {
        this.profileStore.setUserProfileData(res.body?.userData);
        this.navigateToRoleMenu(this.profileStore.getUserProfileData().roleId);
      } else {
        console.log('Something went wrong.');
      }
    } catch (error) {
      console.error('Internal server error', error);
      throw error;
    }
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

  navigateToRoleMenu(roleId: number) {
    switch (roleId) {
      case 1:
        this.router.navigateByUrl('admin');
        break;
      case 2:
        this.router.navigateByUrl('user');
        break;
      default:
        this.router.navigateByUrl('');
    }
  }

  async logout() {
    const url = 'http://localhost:4000/user/logout';
    const options = { observe: 'response' as const, withCredentials: true };

    try {
      const res: HttpResponse<any> = await this.http.get(url, options).toPromise();
      if (res.status == 200) {
        this.router.navigateByUrl('');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Internal server error', err);
      throw err;
    }
  }

  isUser() {
    console.log(this.profileStore.getUserProfileData());
    if (this.profileStore.getUserProfileData().roleId === 2) {
      return true;
    } else {
      return false;
    }
  }
}
