export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
  resetCode: string;
  newPassword: string;
}
