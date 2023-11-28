export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loggerMWInfo } from "./components/util/Logger";
import { logEndForOther, logStartForOther } from "./components/util/log";
import { verifyOrthrosJwt } from "./components/lib/verifyJwt";

export async function middleware(req: NextRequest) {
  loggerMWInfo(logStartForOther("middleware"));
  const res = NextResponse.next();
  const url = req.nextUrl;
  loggerMWInfo(`access path ${url.pathname}`);

  const errorPath = '/jwt-error'
  if (url.pathname === errorPath) {
    loggerMWInfo(logEndForOther(`middleware access path: ${errorPath}`));
    return res;
  }

  const session_cookie = req.cookies.get("session_cookie");
  if (session_cookie == null) {
    loggerMWInfo(`Not found session_cookie.`);
    return NextResponse.redirect(new URL(errorPath, req.url));
  }
  const verify = await verifyOrthrosJwt(session_cookie.value);

  if (!verify) {
    loggerMWInfo(`Failed to verification (session_cookie).`);
    return NextResponse.redirect(new URL(errorPath, req.url));
  }

  loggerMWInfo(logEndForOther("middleware"));
  return res;
}

export const config = {
  matcher: ["/((?!auth|jwt-error|error|_next/static|favicon.ico).*)"],
};
