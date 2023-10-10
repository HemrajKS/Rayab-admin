import { getErrorResponse } from "@/lib/helpers";
import { logout } from "@/lib/logout";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";
import { verifyPass } from "@/lib/verifyPass";
import Order from "@/models/order";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    await connectDB();
    // const userId = req.headers.get('X-User-Id');

    let token = req.cookies.get("token")?.value;
    const userId = (await verifyJWT(token)).sub;

    const user = await User.findOne({ _id: userId });
    const pass = await verifyPass(token, user.password);

    if (pass) {
      if (user.isAdmin) {
        const order = await Order.findOneAndDelete({ _id: body.id });
        await User.findOneAndUpdate(
          {
            _id: userId,
          },
          { $pull: { orders: order._id } },
          { new: true }
        );

        let json_response = {
          status: true,
          categories: order,
          message: "Order deleted successfully",
        };
        return NextResponse.json(json_response);
      } else {
        return getErrorResponse(403, "Only admins can delete order ");
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
