import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    

    let json_response = {
      status: true,
      data: "123"
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
