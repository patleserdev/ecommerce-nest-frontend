// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("oeb-token")?.value;

  // 🔐 Protéger certaines routes seulement
  const protectedRoutes = ["/dashboard", "/admin"];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // Tu peux ajouter + de chemins
  };