import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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

  (await cookies()).set("userId", String(user.id), {
    httpOnly: true,
    path: "/",
  });
  (await cookies()).set("userRole", String(user.role), {
    httpOnly: false,
    path: "/",
  });

  return NextResponse.json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
}
