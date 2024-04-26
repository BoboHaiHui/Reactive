export interface IFullProfileUserData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  blocked: boolean;
}

export interface IEditUserProfile {
  id: number;
  roleId: number;
  blocked: boolean;
}
