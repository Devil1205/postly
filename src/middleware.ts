import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/dashboard", "/contact"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value ?? "";
  const pathname = req.nextUrl.pathname; // Correct way to get route

  if (pathname.startsWith("/api")) {
    return NextResponse.next(); // Let API requests pass through without middleware
  }

  // If user is logged in and trying to access auth routes, redirect to dashboard
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If it's a public route, allow access
  if (publicRoutes.includes(pathname) || authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|_static|favicon.ico|public).*)"],
};
