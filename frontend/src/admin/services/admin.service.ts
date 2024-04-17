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
      console.log(response);
      return response.body.data;
    } catch (error) {
      console.log('An error occurred while fetching users:', error);
      throw error;
    }
  }
}
