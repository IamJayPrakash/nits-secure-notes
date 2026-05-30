import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname === "/login" || pathname === "/register" || pathname === "/forgotpassword";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/create-notes") ||
    pathname.startsWith("/edit-notes");

  // Redirect to login if accessing a protected route without being authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if trying to access login/register while already authenticated
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create-notes/:path*",
    "/edit-notes/:path*",
    "/login",
    "/register",
    "/forgotpassword",
  ],
};
