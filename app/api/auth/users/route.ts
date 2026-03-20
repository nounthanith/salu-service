import { NextResponse } from "next/server";

const apiBase = process.env.NEXT_PUBLIC_API;

export async function GET(req: Request) {
  if (!apiBase) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API is not set" },
      { status: 500 }
    );
  }

  // Get token from cookie
  const token = req.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase}/api/auth/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Cannot reach API server" },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") ?? "";

  const res = new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type": contentType || "application/json; charset=utf-8",
    },
  });

  return res;
}
