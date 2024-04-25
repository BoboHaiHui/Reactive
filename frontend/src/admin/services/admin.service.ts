import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  public async retrieveAll(): Promise<any> {
    const url: string = 'http://localhost:4000/admin/retrieveAllUsers';
    const options = { observe: 'response' as const, withCredentials: true };
    try {
      const response: any = await this.http.get(url, options).toPromise();
      return response.body.data;
    } catch (error) {
      console.log('An error occurred while fetching users:', error);
      throw error;
    }
  }

  public async deleteUser(userID: number): Promise<any> {
    const url: string = 'http://localhost:4000/admin/deleteUser';
    const options = { observe: 'response' as const, withCredentials: true, body: { value: userID } };
    try {
      let response: any = await this.http.delete(url, options).toPromise();
      return response.status;
    } catch (error) {
      console.log('An error occurred while deleting user:', error);
      throw error;
    }
  }
}
