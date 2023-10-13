import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const response = new NextResponse(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.API_URL,
    },
  });

  await Promise.all([
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: -1,
      httpOnly: false,
    }),
    response.cookies.set({
      name: "logged-in",
      value: "",
      maxAge: -1,
      httpOnly: false,
    }),
  ]);

  return response;
}
