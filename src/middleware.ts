import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/cart"];
const authRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;


  if (protectedRoutes.includes(pathname) && !token) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("Url", pathname);
    return NextResponse.redirect(loginUrl);
  }

 
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}
