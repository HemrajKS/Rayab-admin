import { getErrorResponse } from "@/lib/helpers";
import { logout } from "@/lib/logout";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";
import { verifyPass } from "@/lib/verifyPass";
import Product from "@/models/product";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
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

    const productObj = { ...body, addedBy: userId };

    const user = await UserModel.findOne({ _id: userId });
    const pass = await verifyPass(token, user.password);

    if (pass) {
      if (user.isAdmin) {
        const newProduct = new Product(productObj);
        const savedProduct = await newProduct.save();
        let json_response = {
          status: true,
          message: "Product added successfully",
          data: savedProduct,
        };
        return NextResponse.json(json_response);
      } else {
        return getErrorResponse(403, "Only Admins can add products.");
      }
    } else {
      return logout();
    }
  } catch (error) {
    let json_response = {
      status: false,
      results: "some error occured",
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }
}
