import { getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";
import User from "@/models/user";

import { NextResponse } from "next/server";

export async function GET(req) {
  // const userId = req.headers.get('X-User-Id');

  try {
    let token;
    if (req.cookies.has("token")) {
      token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
      token = req.headers.get("Authorization")?.substring(7);
    } else {
      return getErrorResponse(
        401,
        "You are not loggen in, Please log in to proceed..."
      );
    }
    const { sub } = await verifyJWT(token);
    const userId = sub;
    await connectDB();
    if (userId) {
      const profile = await User.findOne({ _id: userId }).select("-password");

      let json_response = {
        status: true,
        message: "User data",
        data: profile,
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, { message: "You must be logged in", sub });
    }
  } catch (error) {
    console.log(error);
    let json_response = {
      status: false,
      results: "some error occured",
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        "Access-Control-Allow-Methods": "GET",
      },
    });
  }
}
