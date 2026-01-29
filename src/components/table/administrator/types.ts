export interface UserRowData {
  id: string; // UUID
  username: string;
  status: string;
  role: "administrator" | "operator" | "ppic" | "maintenance_administrator" | "maintenance";
  password_status: "Normal" | "Temporary" | "Expired";
  last_login: string;
  created_date: string;
  full_name: string;
}
