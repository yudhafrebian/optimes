import { IUser } from "@/interface/user.interface";
import { readUsers } from "@/lib/userStore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return NextResponse.json(null, { status: 401 });

  const user = readUsers().find((u: IUser) => String(u.id) === userId);
  
  if (!user || user.status !== "active") {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    status: user.status,
    username: user.username,
    full_name: user.full_name,
    area: user.area,
    site: user.site,
    role: user.role,
    security: {
      must_change_password: user.must_change_password,
      password_status: user.password_status,
      password_expiry_date: user.password_expiry_date,
      password_last_changed: user.password_last_changed || null,
      last_failed_login_time: user.last_failed_login_time || null
    },
    account_info: {
      account_type: user.account_type,
      account_expiry_date: user.account_expiry_date || null,
      last_login: user.last_login || null,
    },
  });
}