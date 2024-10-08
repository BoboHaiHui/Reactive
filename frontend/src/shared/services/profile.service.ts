import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IProfileUserData } from '../stores/profileUserData.interface';
import { ProfileStore } from '../stores/profileUserData.store';
import { ILoginData, IRegisterData } from './profile.service.interface';

@Injectable()
export class ProfileService {
  constructor(private profileStore: ProfileStore, private http: HttpClient, private router: Router) {}

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

  async activate_account(email: string, activationCode: string) {
    const url = 'http://localhost:4000/user/activateAccount';
    const userActivationAccountData = {
      email: email,
      activationCode: activationCode
    };
    const options = { observe: 'response' as const, data: [] };
    try {
      const res: HttpResponse<any> = await this.http.patch(url, userActivationAccountData, options).toPromise();
      if (res.status == 201) {
        //send a toast message with Account has been activated. Please login!
        return true;
      } else {
        return false;
      }
    } catch {
      console.log('Internal server error');
      return this.router.navigateByUrl('error-page');
    }
  }

  public async login(url: string, loginData: ILoginData): Promise<any> {
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
        return res;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403 && error.error?.statusText === 'blocked' && error.error?.data === 'MFA required') {
          return error;
        } else {
          throw new Error('Login failed');
        }
      } else {
        console.error('Unexpected error occurred during login:', error);
        throw error;
      }
    }
  }

  public async requestProfileUserData() {
    const url: string = 'http://localhost:4000/user/profileUserData';
    const options = { observe: 'response' as const, withCredentials: true };
    let profileUserData = this.profileStore.getUserProfileData();
    if (profileUserData) {
      return profileUserData;
    } else {
      try {
        const res: HttpResponse<any> = await this.http.get(url, options).toPromise();
        if (res.status == 200) {
          profileUserData = res.body?.userData;
          this.profileStore.setUserProfileData(profileUserData);
          return profileUserData;
        } else {
          return null;
        }
      } catch {
        console.error('Internal server error');
        throw new Error('Internal server error');
      }
    }
  }

  public async updateProfileData(newData) {
    const url: string = 'http://localhost:4000/user/updateProfile';
    const options = { observe: 'response' as const, withCredentials: true };
    try {
      const res: HttpResponse<any> = await this.http.patch(url, newData, options).toPromise();
      if (res.status == 201) {
        //send a toast message with Account has been activated. Please login!
        return true;
      } else {
        return false;
      }
    } catch {
      console.error('Internal server error');
      throw new Error('Internal server error');
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
    this.profileStore.setUserProfileData(null);
    try {
      const res: HttpResponse<any> = await this.http.get(url, options).toPromise();
      if (res.status == 200) {
        this.router.navigateByUrl('');
        return true;
      } else {
        //add banner - logout error! sessionId could still be active
        return false;
      }
    } catch {
      console.error('Internal server error');
      throw new Error('Internal server error');
    }
  }

  isUser(profileUserData: IProfileUserData) {
    if (profileUserData?.roleId == 2) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(profileUserData: IProfileUserData) {
    if (profileUserData?.roleId == 1) {
      return true;
    } else {
      return false;
    }
  }
}
