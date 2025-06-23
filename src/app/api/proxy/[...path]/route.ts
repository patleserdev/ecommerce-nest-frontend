import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND;

type HandlerContext = {
  params: {
    path: string[];
  };
};

async function handler(req: NextRequest, path: string[]) {
  if (!BACKEND_BASE_URL) {
    return new NextResponse("Missing BACKEND_BASE_URL env var", { status: 500 });
  }
  const method = req.method;
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_BASE_URL}/${path.join("/")}${search}`;

  // Récupère tout le corps en raw buffer (pour POST/PATCH/PUT)
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
    credentials: 'include', // 👈 essentiel pour transmettre les cookies
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

export const GET = (req:NextRequest, ctx:HandlerContext) => handler(req, ctx.params.path);
export const POST = (req:NextRequest, ctx:HandlerContext) => handler(req, ctx.params.path);
export const PATCH = (req:NextRequest, ctx:HandlerContext) => handler(req, ctx.params.path);
export const PUT = (req:NextRequest, ctx:HandlerContext) => handler(req, ctx.params.path);
export const DELETE = (req:NextRequest, ctx:HandlerContext) => handler(req, ctx.params.path);
