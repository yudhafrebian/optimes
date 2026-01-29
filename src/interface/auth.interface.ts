import { UserRole } from "./user.interface";

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IAuthRegister {
  username: string;
  full_name: string;
  password: string;
  password_status: "normal" | "temporary" | "expired" | "";
  role: UserRole | "";
  area: string;
  site: string;
  account_type: "permanent" | "temporary" | "";
  account_expiry_date: Date | null;
  password_expiry_date: Date
  must_change_password: boolean
  created_date: Date
}

