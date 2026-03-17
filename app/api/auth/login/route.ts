import { NextResponse } from "next/server";

const apiBase = process.env.NEXT_PUBLIC_API;

export async function POST(req: Request) {
  if (!apiBase) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API is not set" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);

  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
  } catch {
    return NextResponse.json(
      { message: "Cannot reach auth server" },
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

  // Extract token from JSON and store in HttpOnly cookie so we never touch localStorage.
  try {
    const data = JSON.parse(text);
    const token =
      data?.token ??
      data?.accessToken ??
      data?.data?.token ??
      data?.data?.accessToken;

    if (typeof token === "string" && token.length > 0) {
      res.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }
  } catch {
    // non-JSON body; ignore
  }

  return res;
}

