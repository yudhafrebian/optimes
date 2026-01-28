import { NextResponse } from "next/server";
import { readUsers } from "@/lib/userStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = readUsers();

  return NextResponse.json(
    users.map(({ password, ...u }: any) => u)
  );
}
