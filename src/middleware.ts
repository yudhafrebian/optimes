import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userId = req.cookies.get("accountId")?.value;

  // 1. Bypass untuk file statis dan api internal (jika ada)
  if (pathname.startsWith("/_next") || pathname.includes("/api/")) {
    return NextResponse.next();
  }

  // 2. Proteksi Dasar: Jika ke dashboard/change-password tapi tidak ada cookie userId
  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/change-password")) &&
    !userId
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (userId) {
    try {
      // 3. Ambil data user terbaru dari API
      const response = await fetch(
        `http://192.168.68.99:2000/api/accounts/${userId}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!response.ok) throw new Error("User invalid");

      const resData = await response.json();
      const user = resData.data || resData;

      const role = user.account_role?.label
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
      // Pastikan field ini sesuai dengan response API Anda (boolean)
      const isBypassed = req.cookies.get("bypass_password")?.value === "true";
      const mustChangePassword = isBypassed ? false : user.must_change_password;

      // 4. Logika Redirect Berdasarkan Status "Must Change Password"
      if (mustChangePassword) {
        // Jika wajib ganti password tapi malah buka dashboard, paksa ke /change-password
        if (pathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/change-password", req.url));
        }
      } else {
        // Jika SUDAH ganti password tapi mencoba balik ke /change-password
        if (pathname.startsWith("/change-password")) {
          return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
        }
      }

      // 5. Jika sudah login tapi buka halaman login
      if (pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
      }

      // 6. Proteksi Role (RBAC)
      if (pathname.startsWith("/dashboard/")) {
        const pathRole = pathname.split("/")[2];
        if (role && pathRole !== role) {
          return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const res = NextResponse.redirect(new URL("/auth/login", req.url));
      res.cookies.delete("accountId");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/change-password"],
};
