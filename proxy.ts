import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_PATH_PREFIXES = ["/dashboard", "/users"];
const apiBase = process.env.NEXT_PUBLIC_API;

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
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If we don't have an API base URL, fail closed for admin pages.
  if (!apiBase) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Role check: only allow admin users into admin routes.
  // We validate role by calling the upstream profile endpoint.
  return (async () => {
    let upstream: Response;
    try {
      upstream = await fetch(`${apiBase}/api/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (!upstream.ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const text = await upstream.text();
    try {
      const data = JSON.parse(text);
      const user = data?.data?.user ?? data?.user;
      const role = user?.role;
      if (role !== "admin") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } catch {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  })();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};

