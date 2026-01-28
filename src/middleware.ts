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

  if (pathname.startsWith("/dashboard") && role) {
    const allowedPath = `/dashboard/${role}`;
    if (!pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL(allowedPath, req.url));
    }
  }

  return NextResponse.next();
}
