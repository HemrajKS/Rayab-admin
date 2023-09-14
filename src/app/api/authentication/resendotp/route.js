import { sendMail } from "@/app/services/mail";
import { generateOTP } from "@/app/services/otp";
import { getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/user";
import Verify from "@/models/verification";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    await connectDB();
    const [user] = await UserModel.find({
      email: body.email,
      _id: body.id,
    });

    if (JSON.stringify(user) === "[]" || !user) {
      return getErrorResponse(
        404,
        "Not Registered, Please Register before Verification"
      );
    } else {
      if (user.isActive) {
        return getErrorResponse(
          403,
          "Already registered, Please Login to continue"
        );
      } else {
        const otp = generateOTP();
        const hashedOtp = await hash(otp, 12);
        const [otpDetails] = await Verify.find({
          email: body.email,
          _id: body.id,
        });
        const verificationObj = {
          _id: user._id,
          email: user.email,
          otp: hashedOtp,
        };
        await sendMail({ to: body.email, otp, template: "otpTemplate" });

        if (JSON.stringify(otpDetails) === "[]" || !otpDetails) {
          const verification = new Verify(verificationObj);
          const updatedOtp = await verification.save();

          const sanitizedNewUser = { ...updatedOtp.toObject() };
          delete sanitizedNewUser.otp;
          return new NextResponse(
            JSON.stringify({
              status: "success",
              message: "OTP sent to your Mail",
              data: sanitizedNewUser,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } else {
          const updatedOtp = await Verify.findOneAndUpdate(
            {
              _id: body.id,
            },
            { otp: hashedOtp },
            { new: true }
          );

          const sanitizedNewUser = { ...updatedOtp.toObject() };
          delete sanitizedNewUser.otp;
          return new NextResponse(
            JSON.stringify({
              status: "success",
              message: "OTP sent to your Mail",
              data: sanitizedNewUser,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }
  } catch (error) {
    return getErrorResponse(500, error.message);
  }
}
