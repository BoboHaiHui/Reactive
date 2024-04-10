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
