import { getErrorResponse } from "@/lib/helpers";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
  const isAdmin = true;
  try {
    await connectDB();
    const body = await req.json();
    const user = await UserModel.findOne({
      email: body.email,
      username: body.username,
    });
    const hashedPassword = await hash(body.password, 12);
    console.log(body);
    if (
      body.username &&
      body.email &&
      body.password &&
      body.cpassword &&
      body.firstName
    ) {
      if (user) {
        return getErrorResponse(400, "User already exist");
      } else {
        if (isAdmin) {
          try {
            const newUser = new UserModel(body);
            const savedUser = await newUser.save();
            return new NextResponse(
              JSON.stringify({
                status: "success",
                data: { user: { savedUser, password: undefined } },
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch (error) {
            return getErrorResponse(400, error.message);
          }
        }
      }
    } else {
      return getErrorResponse(400, "Please Enter all the required fields");
    }

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { user, password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
