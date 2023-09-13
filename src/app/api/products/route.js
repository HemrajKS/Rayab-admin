import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import Product from "@/models/product";
import connectDB from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectDB();
    const totalProducts = await Product.count();

    const skip = JSON.parse(request.nextUrl.searchParams.get("skip"))
      ? JSON.parse(request.nextUrl.searchParams.get("skip"))
      : 0;
    const limit = JSON.parse(request.nextUrl.searchParams.get("limit"))
      ? JSON.parse(request.nextUrl.searchParams.get("limit"))
      : totalProducts;

    const queryId = request.nextUrl.searchParams.get("id");

    const products = queryId
      ? await Product.findOne({ _id: queryId })
      : await Product.find({}, {}, { skip, limit });

    let json_response = {
      status: true,
      products: products,
      totalCount: totalProducts,
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
        "Access-Control-Allow-Methods": "GET",
      },
    });
  }
}
