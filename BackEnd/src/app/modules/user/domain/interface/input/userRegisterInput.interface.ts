export interface IRegisterInput{
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  terms: boolean
}

export interface IRetrieveOneInput{
  field: Field['value'],
  value: string | number
}

export interface ILoginInput{
  email: string,
  password: string
}

export interface IResponceMessage{
  status: string,
  data: any
}

interface Field{
  value: "firstName" | "lastName" | "email";
}