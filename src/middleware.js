import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";
import { protectedRoutes } from "./app/constants/constants";

export async function middleware(req) {
  let token;

  if (
    req.nextUrl.pathname.startsWith("/api/admin") ||
    protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    if (req.cookies.has("token")) {
      token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
      token = req.headers.get("Authorization")?.substring(7);
    } else {
      return getErrorResponse(
        401,
        "You are not loggen in, Please log in to proceed"
      );
    }

    try {
      const response =NextResponse.next()
      if (token) {
        const { sub, name, email } = await verifyJWT(token);
        req.user = { id: sub, name, email };
        response.headers.set("X-USER-ID", sub);
        return response;
      }
    } catch (error) {
      console.log(error)
      return getErrorResponse(401, "Token is invalid or user doesn't exists");
    }
  } else {
    return NextResponse.next();
  }
}