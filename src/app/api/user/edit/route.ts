import { NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/lib/userStore";
import { UserRole } from "@/interface/user.interface";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, role } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const users = readUsers();

    const index = users.findIndex((u: any) => u.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // update user
    users[index] = {
      ...users[index],
      role: role as UserRole,
      updated_at: new Date().toISOString(),
    };

    writeUsers(users);

    return NextResponse.json({
      message: "User updated successfully",
      data: users[index],
    });
  } catch (error) {
    console.error("EDIT USER ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
