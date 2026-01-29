export type UserRole =
  | "administrator"
  | "operator"
  | "ppic"
  | "maintenance_administrator"
  | "maintenance";
export type UserStatus = "active" | "suspended" | "disabled" | "deleted";
export interface IUser {
  id: string | number;
  username: string;
  full_name: string;
  role: UserRole;
  area: string;
  site: string;
  
  security: {
    must_change_password: boolean;
    password_status: "Normal" | "Temporary" | "Expired";
    password_expiry_time?: string;
    password_last_changed?: string | null;
    last_failed_login_time?: string;
  };
  
  account_info: {
    account_type: "Permanent" | "Temporary";
    last_login?: string;
    account_expiry_date?: string | null;
  };

  status: UserStatus;
}


export interface IEditUser {
  role: UserRole;
}

export interface IDisableUser {
  id?: string;
  reason: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface IResetPasswordAdmin {
  password: string;
  password_status: "normal" | "temporary" | "expired";
  password_expiry_date: Date;
}