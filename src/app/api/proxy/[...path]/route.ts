import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND;

async function handler(req: NextRequest, path: string[]) {
  if (!BACKEND_BASE_URL) {
    return new NextResponse('Missing BACKEND_BASE_URL env variable', { status: 500 });
  }
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handler(req, path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handler(req, path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handler(req, path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handler(req, path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handler(req, path);
}

