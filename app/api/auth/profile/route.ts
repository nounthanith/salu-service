import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const apiBase = process.env.NEXT_PUBLIC_API;

export async function GET() {
  if (!apiBase) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API is not set" },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Access token is required" },
      { status: 401 }
    );
  }

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
    return NextResponse.json(
      { message: "Cannot reach auth server" },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") ?? "";

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type": contentType || "application/json; charset=utf-8",
    },
  });
}

