import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_PATH_PREFIXES = ["/dashboard", "/users"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPath = ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isAdminPath) return NextResponse.next();

  // Expect the auth token to be stored in a cookie named "token".
  // If you use a different cookie name, change it here.
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};

