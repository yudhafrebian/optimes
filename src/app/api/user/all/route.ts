import { NextResponse } from "next/server";
import { readUsers } from "@/lib/userStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = readUsers();

  const formattedUsers = users.map((user: any) => {
    // Kita pisahkan data sensitif dan data yang akan dikelompokkan
    const { 
      password, 
      must_change_password, 
      password_status, 
      password_expiry_date,
      account_type,
      account_expiry_date,
      last_login,
      last_failed_login_time,
      password_last_changed,
      ...otherData 
    } = user;

    return {
      ...otherData,
      security: {
        must_change_password,
        password_status,
        password_expiry_date,
        password_last_changed,
        last_failed_login_time
      },
      account_info: {
        account_type: account_type || "permanent",
        account_expiry_date: account_expiry_date || null,
        last_login: last_login || null,
      }
    };
  });

  return NextResponse.json(formattedUsers);
}