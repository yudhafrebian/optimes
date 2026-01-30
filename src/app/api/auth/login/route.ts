import { NextResponse } from "next/server";
import { readUsers } from "@/lib/userStore";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const users = readUsers();

  const user = users.find(
    (u: any) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  if(user.status !== "active") {
    return NextResponse.json(
      { message: "Your account is disabled, please contact your administrator" },
      { status: 401 }
    );
  }

return NextResponse.json({
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    role: user.role,
    site: user.site,
    area: user.area,
    security: {
      must_change_password: user.must_change_password,
      password_status: user.password_status,
      password_expiry_time: user.password_expiry_time,
      password_last_changed: user.password_last_changed,
      last_failed_login_time: user.last_failed_login_time
    },
    account_info: {
      account_type: user.account_type,
      last_login: user.last_login_time,
      account_expiry_date: user.account_expiry_date
    }
  });
}
