// app/api/proxy/adresses/route.ts

import { NextRequest, NextResponse } from 'next/server';
const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;
export async function GET(req: NextRequest) {
  const backendUrl = `${API_BACKEND}/adresses/user`;

  const cookie = req.headers.get('cookie') || '';

  const backendRes = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Cookie: cookie, // on passe le cookie original à l'API
    },
  });

  console.log('backendRes',backendRes)
  const data = await backendRes.json();

  return NextResponse.json(data, {
    status: backendRes.status,
  });
}
