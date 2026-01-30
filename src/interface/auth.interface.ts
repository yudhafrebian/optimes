import { UserRole } from "./user.interface";

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IAuthRegister {
  username: string;
  full_name: string;
  phone_number?: string
  email?: string
  account_role: string;
  account_type: string;
  account_expiry_date: string;
  password_expiry_date: Date
}

