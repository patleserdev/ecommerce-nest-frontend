import { NextRequest, NextResponse } from "next/server";

const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;

export async function POST(request: NextRequest) {


  const body = await request.json();

  const res = await fetch(`${API_BACKEND}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", // très important pour accepter les cookies
  });

  // Récupérer le corps JSON
  const data = await res.json();

  // Récupérer les cookies envoyés par le backend dans les headers 'set-cookie'
  const cookies = res.headers.get("set-cookie");

  let role
  // récupérer le rôle et l'envoyer au user redux
  if (cookies) {
    const roleMatch = cookies.match(/role=([^;]+)/);
    role = roleMatch ? roleMatch[1] : null;
    console.log("Role extrait du cookie :", role);
    if (role) {
      data.role=role

    }
  }

  // Préparer la réponse Next.js
  const response = NextResponse.json(data, { status: res.status });

  // Si backend a envoyé des cookies, les passer côté client
  if (cookies) {
    // Note : si plusieurs cookies, il faudra gérer ça ici
    response.headers.append("Set-Cookie", cookies);
  }

  return response;
}
