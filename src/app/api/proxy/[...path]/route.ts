import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND;

async function handler(req: NextRequest, path: string[]) {
  const method = req.method;
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_BASE_URL}/${path.join('/')}${search}`;

  const headers = new Headers(req.headers);
  headers.set('cookie', req.headers.get('cookie') || '');

  const body =
    method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined;

  const backendRes = await fetch(targetUrl, {
    method,
    headers,
    body,
    redirect: 'manual',
  });

  const responseBody = await backendRes.text();

  return new NextResponse(responseBody, {
    status: backendRes.status,
    headers: backendRes.headers,
  });
}

// 🔁 UTILISE UNE FONCTION ANONYME POUR CHAQUE MÉTHODE POUR ÉVITER L'ERREUR
export const POST = async (req: NextRequest, context: { params: { path: string[] } }) => {
  return handler(req, context.params.path);
};

export const GET = async (req: NextRequest, context: { params: { path: string[] } }) => {
  return handler(req, context.params.path);
};

export const PUT = async (req: NextRequest, context: { params: { path: string[] } }) => {
  return handler(req, context.params.path);
};

export const PATCH = async (req: NextRequest, context: { params: { path: string[] } }) => {
  return handler(req, context.params.path);
};

export const DELETE = async (req: NextRequest, context: { params: { path: string[] } }) => {
  return handler(req, context.params.path);
};
