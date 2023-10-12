import { getErrorResponse } from "@/lib/helpers";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    // const userId = req.headers.get('X-User-Id');

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
    const userId = (await verifyJWT(token)).sub;

    const user = await UserModel.findOne({
      _id: userId,
    });
    const hashedPassword = await hash(body.newPw, 12);

    if (body.oldPw && body.newPw && body.cPw) {
      if (user) {
        if (body.newPw === body.cPw) {
          if (await compare(body.oldPw, user.password)) {
            const newPassword = await UserModel.findOneAndUpdate(
              { _id: userId },
              { password: hashedPassword },
              { new: true }
            ).select("-password");
            let json_response = {
              status: true,
              message: "Password changed successfully",
              data: { newPassword },
            };
            return NextResponse.json(json_response);
          } else {
            return getErrorResponse(401, "Different old password");
          }
        } else {
          return getErrorResponse(401, "Passwords are not matching");
        }
      } else {
        return getErrorResponse(400, "User not found");
      }
    } else {
      return getErrorResponse(400, "Please Enter all the required fields");
    }
  } catch (error) {
    return getErrorResponse(500, error.message);
  }
}
