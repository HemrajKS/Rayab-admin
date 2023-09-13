import connectDB from "@/lib/mongodb";
import PrivacyPolicy from "@/models/privacyPolicy";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const misc = await PrivacyPolicy.find({});

    let json_response = {
      status: true,
      misc: misc,
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
