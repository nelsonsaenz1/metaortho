import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// SITE PASSWORD PROTECTION
// Set SITE_PASSWORD in your Vercel environment variables to
// enable password protection. Remove this middleware (or set
// SITE_PASSWORD to empty) to make the site public.
// ============================================================
const SITE_PASSWORD = process.env.SITE_PASSWORD || "";

export function middleware(request: NextRequest) {
  // If no password is set, allow all traffic through
  if (!SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Skip password check for the login page itself, static assets, and API routes
  const { pathname } = request.nextUrl;
  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if user has the auth cookie
  const authCookie = request.cookies.get("site-auth");
  if (authCookie?.value === SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login page
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
