import { readUsers } from "@/lib/userStore";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, reason } = body; // Tangkap reason jika ingin disimpan

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const users = readUsers();

    // Gunakan == agar lebih fleksibel terhadap tipe data string/number,
    // atau pastikan tipe datanya sama.
    const index = users.findIndex((u: any) => String(u.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update status. Pastikan "Disabled" sesuai dengan filter di frontend
    users[index] = {
      ...users[index],
      status: "disabled", // Gunakan lowercase jika frontend kamu pakai .toLowerCase()
      disable_reason: reason, // Simpan alasannya
    };

    // PENTING: Jangan lupa simpan kembali ke file/store jika kamu menggunakan file system
    // writeUsers(users);

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
