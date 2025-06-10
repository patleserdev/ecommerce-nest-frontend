import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  const { cookies } = req;

  // Nom du cookie à vérifier
  const cookieName = "oeb_token";
  const cookieName2 = "role";

  if (!cookies.get(cookieName) && !cookies.get(cookieName2)) {
    const response = NextResponse.json({ clearRedux: true });
    return response;
  }
  return NextResponse.json({ clearRedux: false });
}
