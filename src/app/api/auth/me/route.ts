import { dummyUsers } from "@/lib/dummyUser";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return NextResponse.json(null, { status: 401 });

  const user = dummyUsers.find((u) => String(u.id) === userId);
  if (!user) return NextResponse.json(null, { status: 401 });

  return NextResponse.json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
}
