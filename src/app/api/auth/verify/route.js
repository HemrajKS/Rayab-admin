import { sendMail } from "@/app/services/mail";
import { getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/user";
import Verify from "@/models/verification";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    await connectDB();
    const [user] = await Verify.find({
      email: body.email,
      _id: body.id,
    });

    if (body.email && body.id && body.otp) {
      if (JSON.stringify(user) === "[]" || !user) {
        return getErrorResponse(404, "Not Registered or OTP expired");
      } else {
        if (body.otp) {
          if (!(await compare(body.otp, user.otp))) {
            return getErrorResponse(401, "Invalid OTP");
          } else {
            try {
              const user = await UserModel.findOneAndUpdate(
                {
                  _id: body.id,
                },
                { isActive: true },
                { new: true }
              );
              const sanitizedNewUser = { ...user.toObject() };
              delete sanitizedNewUser.password;
              await sendMail({
                to: body.email,
                template: "regSuccessTemplate",
              });

              return new NextResponse(
                JSON.stringify({
                  status: "success",
                  message:
                    "Congratuation you have been successfully registered",
                  data: sanitizedNewUser,
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            } catch (error) {
              return getErrorResponse(500, "Error in fetching the data");
            }
          }
        } else {
          return getErrorResponse(404, "Please enter OTP");
        }
      }
    } else {
      return getErrorResponse(404, "Some fields are missing");
    }
  } catch (error) {
    return getErrorResponse(500, error.message);
  }
}
