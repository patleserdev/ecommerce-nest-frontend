import { NextRequest, NextResponse } from 'next/server';
import type { NextRequest as ReqType } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND;

async function handler(req: ReqType, path: string[]) {
  if (!BACKEND_BASE_URL) {
    return new NextResponse("Missing BACKEND_BASE_URL env var", { status: 500 });
  }

  const method = req.method;
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_BASE_URL}/${path.join("/")}${search}`;

  const rawBody = method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();

  const headers = new Headers(req.headers);
  for (const [key, value] of req.headers.entries()) {
    if (!["accept-encoding", "content-length"].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  headers.set("accept-encoding", "identity");
  headers.set("cookie", req.headers.get("cookie") || "");

  const backendRes = await fetch(targetUrl, {
    method,
    headers,
    body: rawBody ? new Uint8Array(rawBody) : undefined,
    credentials: 'include',
    duplex: "half",
    redirect: "manual",
  } as any);

  const responseHeaders = new Headers(backendRes.headers);
  responseHeaders.set("Access-Control-Allow-Credentials", "true");
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: responseHeaders,
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handler(req, params.path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handler(req, params.path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handler(req, params.path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handler(req, params.path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handler(req, params.path);
}
