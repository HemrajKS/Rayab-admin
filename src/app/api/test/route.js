import { createMessage } from "@/lib/messageService";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    createMessage(
      "Hemraj",
      "hkshettigar@gmail.com",
      "1234",
      "1235555",
      "Mixer",
      "https://www.google.com"
    );

    return NextResponse.json({ message: "Success" });
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
