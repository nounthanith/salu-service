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
    upstream = await fetch(`${apiBase}/api/auth/register`, {
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

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type": contentType || "application/json; charset=utf-8",
    },
  });
}

