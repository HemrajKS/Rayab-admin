import connectDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const user = req.headers.get("x-user-id");
    const productObj = { ...body, addedBy: user };

    const newProduct = new   Product(productObj);
    const savedProduct = await newProduct.save();
    let json_response = {
      status: true,
      data: savedProduct,
    };
    return NextResponse.json(json_response);
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
