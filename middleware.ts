import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("admin.")) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/studio")) {
      url.pathname = "/studio" + url.pathname;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};