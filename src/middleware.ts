import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userId = req.cookies.get("userId")?.value;
  const role = req.cookies.get("userRole")?.value;

  if (pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/auth/login") && userId && role) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
  }

  if (pathname.startsWith("/dashboard/")) {
    const segments = pathname.split("/");
    const pathRole = segments[2]; 

    if (role && pathRole && pathRole !== role) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
  }

  return NextResponse.next();
}

// Tambahkan config agar middleware tidak berjalan di setiap file statis (image/css)
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};