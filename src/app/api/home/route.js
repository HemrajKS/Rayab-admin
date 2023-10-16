import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeData from "@/models/home";

export async function GET(request) {
  try {
    await connectDB();

    const home = await HomeData.findOne({});

    let json_response = {
      status: true,
      data: home,
    };
    return NextResponse.json(json_response, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, User",
      },
    });
  } catch (error) {
    console.log(error);
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
