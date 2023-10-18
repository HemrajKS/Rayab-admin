import { getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
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

  try {
    await connectDB();
    const user = await User.findOne({ _id: userId });

    if (user) {
      const reviewUser = {
        ...body,
        ...{ userId: userId },
        ...{ user: user.username },
      };

      const review = await Product.findOneAndUpdate(
        {
          _id: body.productId,

          reviews: {
            $not: {
              $elemMatch: { user: user.username },
            },
          },
          rating: 0,
        },
        { $push: { reviews: reviewUser } },

        { new: true }
      );

      if (review) {
        let json_response = {
          status: true,
          data: review,
          message: "Review has been added successfully",
        };

        return NextResponse.json(json_response);
      } else {
        return getErrorResponse(403, "Duplicate Entry or Invalid Review");
      }
    } else {
      return getErrorResponse(403, "Please Login");
    }
  } catch (error) {
    let json_response = {
      status: false,
      results: "could not update reviews",
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        "Access-Control-Allow-Methods": "PATCH",
      },
    });
  }
}
