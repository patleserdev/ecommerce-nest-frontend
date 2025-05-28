import { NextRequest, NextResponse } from "next/server";
const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;

export async function POST(request: NextRequest) {
  const res = await fetch(`${API_BACKEND}/users/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // très important pour accepter les cookies
  });

  if (res) {
    const response = NextResponse.json({ message: "Logged out successfully" });
    // Supprimer les cookies en les réécrivant avec une date expirée
    response.cookies.set("oeb-token", "", {
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("role", "", {
      path: "/",
      expires: new Date(0),
    });

    return response;
  }

 
}
