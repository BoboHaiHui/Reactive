import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {}

  public async retrieveAllRoles(): Promise<any> {
    const url: string = 'http://localhost:4000/admin/roles/retrieveAllRoles';
    const options = { observe: 'response' as const, withCredentials: true };
    try {
      const response: any = await this.http.get(url, options).toPromise();
      return response.body.data;
    } catch (error) {
      console.log('An error occurred while fetching users roles:', error);
      throw error;
    }
  }

  public async deleteRoleByType(roleType: string): Promise<any> {
    const url: string = 'http://localhost:4000/admin/roles/deleteRoleByType';
    const options = { observe: 'response' as const, withCredentials: true, body: { value: roleType } };
    try {
      let response: any = await this.http.delete(url, options).toPromise();
      return response.status;
    } catch (error) {
      console.log('An error occurred while deleting role:', error);
      throw error;
    }
  }

  public async updateRole(editRoleData: any): Promise<any> {
    const url: string = 'http://localhost:4000/admin/roles/updateRole';
    const options = { observe: 'response' as const, withCredentials: true };
    const body: any = {
      type: editRoleData.type,
      description: editRoleData.description,
      permissions: editRoleData.permissions
    };
    try {
      const response: any = await this.http.patch(url, body, options).toPromise();
      return response.status;
    } catch (error) {
      console.log('An error occurred while edidting user role:', error);
      throw error;
    }
  }

  public async createRole(editRoleData: any): Promise<any> {
    const url: string = 'http://localhost:4000/admin/roles/createRole';
    const options = { observe: 'response' as const, withCredentials: true };
    const body: any = {
      type: editRoleData.type,
      description: editRoleData.description,
      permissions: editRoleData.permissions
    };
    try {
      const response: any = await this.http.post(url, body, options).toPromise();
      return response.status;
    } catch (error) {
      console.log('An error occurred while creating user role:', error);
      throw error;
    }
  }
}
