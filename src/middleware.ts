// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("oeb-token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  // console.log("Middleware check:", { token, role, pathname });

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");

  if ((isDashboard || isAdminPage) && !token) {
    // console.log("Redirection vers login car pas de token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (role === "admin") {
    // console.log("Accès admin autorisé");
    return NextResponse.next();
  }

  if (role === "customer") {
    if (isDashboard) {
      // console.log("Accès dashboard customer autorisé");
      return NextResponse.next();
    }
    if (isAdminPage) {
      // console.log("Redirection unauthorized pour customer sur admin");
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (isDashboard || isAdminPage) {
    // console.log("Redirection vers login par défaut");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // console.log("Passage next par défaut");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

