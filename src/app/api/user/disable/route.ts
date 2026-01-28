import { readUsers } from "@/lib/userStore";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const users = readUsers();
    const index = users.findIndex((u: any) => u.id === Number(id));
    
    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    users[index] = {
      ...users[index],
      status: "Disabled",
    };

    return NextResponse.json({
      message: "User disabled successfully",
      data: users[index],
    });

  } catch (error) {
    console.log("DISABLE USER ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
