import { NextResponse } from "next/server";

export async function logout() {
  const response = new NextResponse(
    JSON.stringify({ message: "You are  not loggedin" }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    }
  );

  await Promise.all([
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: -1,
    }),
    response.cookies.set({
      name: "logged-in",
      value: "",
      maxAge: -1,
    }),
  ]);

  return response;
}
