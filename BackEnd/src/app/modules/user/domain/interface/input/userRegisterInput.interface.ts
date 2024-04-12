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
  status: string;
  data: any;
}

export interface IUserProfileData {
  status: string;
  data: string;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  };
}

interface Field {
  value: 'firstName' | 'lastName' | 'email';
}
