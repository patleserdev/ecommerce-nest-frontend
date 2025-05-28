// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("oeb-token")?.value;
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;

    // Routes protégées
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdminPage = pathname.startsWith("/admin");

 // 🔐 Rediriger si pas connecté
 if ((isDashboard || isAdminPage) && !token) {
  return NextResponse.redirect(new URL("/login", request.url));
}

// ✅ Admin a accès à tout
if (role === "admin") {
  return NextResponse.next();
}

// 🚫 Customer n'a pas accès à /admin
if (isAdminPage && role !== "admin") {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

// ✅ Customer peut accéder au dashboard
if (isDashboard && role === "customer") {
  return NextResponse.next();
}

  return NextResponse.next();
}

// 🔧 Configuration : match admin & dashboard
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};