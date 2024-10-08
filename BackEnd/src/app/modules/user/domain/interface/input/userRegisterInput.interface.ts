export interface IRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface IRetrieveOneInput {
  field: Field['value'];
  value: string | number;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IResponceMessage {
  statusText: string;
  data: any;
}

export interface IUserProfileData {
  statusText: string;
  data: string;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  };
}

export interface IEditUserData {
  userId: number;
  roleId: number;
  blocked: boolean;
}

export interface IActivateAccountData {
  email: string;
  activationCode: string;
}

export interface IUnblockAccountData {
  email: string;
  unblockCode: string;
}

export interface IUpdateProfileInput {
  firstName?: string;
  lastName?: string;
  oldPassword?: string;
  newPassword?: string;
}

interface Field {
  value: 'firstName' | 'lastName' | 'email' | 'id';
}
