import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import { signJWT } from "@/lib/token";
import { compare } from "bcryptjs";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  try {
    await connectDB();
    const user = await UserModel.findOne({
      email: body.email,
      isAdmin: !!body.isAdmin,
    });

    if (
      !user ||
      !(await compare(body.password, user.password)) ||
      !user.isActive
    ) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user._id, name: user.username },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      // httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
      sameSite: "None",
    };

    // Configure CORS headers
    const response = new NextResponse(
      JSON.stringify({
        status: true,
        message: `You have been successfully logged in as ${user.username}`,
      }),
      {
        status: 200,
        token: token,
        headers: {
          // Allow your Angular app's origin (replace with your actual Angular app's URL)
          "Access-Control-Allow-Origin": process.env.API_URL || "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error) {
    return getErrorResponse(500, error.message);
  }
}
