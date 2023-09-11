import { getErrorResponse } from "@/lib/helpers";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import connectDB from "@/lib/mongodb";

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

    if (
      body.username &&
      body.email &&
      body.password &&
      body.cpassword &&
      body.firstName
    ) {
      const copiedObject = {
        ...body,
        password: hashedPassword,
        isAdmin: true,
        cpassword: undefined,
      };

      if (user) {
        return getErrorResponse(400, "User already exist");
      } else {
        if (body.password === body.cpassword) {
          if (isAdmin) {
            try {
              delete copiedObject.cpassword;
              const newUser = new UserModel(copiedObject);
              const savedUser = await newUser.save();
              const sanitizedObj = {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
              };
              return new NextResponse(
                JSON.stringify({
                  status: "success",
                  data: sanitizedObj,
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
        } else {
          return getErrorResponse(401, "Passwords are not matching");
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
