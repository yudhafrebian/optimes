export type UserRole =
  | "administrator"
  | "operator"
  | "ppic"
  | "maintenance_administrator"
  | "maintenance";
export type UserStatus = "active" | "suspended" | "disabled" | "deleted";
export interface IUser {
  id: number;
  username: string;
  full_name: string;
  password: string;
  password_status: "normal" | "temporary" | "expired";
  must_change_password: boolean;
  role: UserRole;
  area: string;
  site: string;
  employment_type: "full_time" | "temporary";
  status: UserStatus;
  password_expiry_date: string;
  last_login: string;
  created_date: string;
}

export interface IEditUser {
  role: UserRole;
}
