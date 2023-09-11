import { getErrorResponse } from "@/lib/helpers";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  const isAdmin = true;
  let data = {};

  try {
    await connectDB();
    const body = await req.json();
    const user = await UserModel.findOne({email:body.email});
    console.log(user)

    // if(body.name&&body.email&&body.password&&body.passwordConfirm){
    // // if (user) {
    // //   return getErrorResponse(400, "User already exist");
    // // } else {
    // //   if(isAdmin){

    // //   }
    // // }
    // }else{
    //   return getErrorResponse(400, "Please Enter all the fields");
    // }

    const hashedPassword = await hash(body.password, 12);

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
