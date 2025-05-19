// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export function GET() {
  try {
    // fallback if env var is missing
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const redirectUrl = new URL("/sign-in", baseUrl).toString();

    const response = NextResponse.redirect(redirectUrl);

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: "lax" as const,
      expires: new Date(0),
    };

    const cookiesToExpire = ["next-auth.session-token", "next-auth.csrf-token"];

    cookiesToExpire.forEach((name) => {
      response.headers.append("Set-Cookie", serialize(name, "", cookieOptions));
    });

    return response;
  } catch (err) {
    console.error("[logout] ERROR:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
