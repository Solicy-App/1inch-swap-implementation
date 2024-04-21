import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.searchParams.set("chain", "1");

  if (!req.nextUrl.searchParams.get("chain")) {
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/"],
};
