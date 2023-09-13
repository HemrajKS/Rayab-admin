import { getErrorResponse } from "@/lib/helpers";
import connectDB from "@/lib/mongodb";
import Category from "@/models/category";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();

    const userId = req.headers.get("x-user-id");
    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      try {
        const updatedCat = await Category.findOneAndUpdate(
          { _id: body.id },
          body,
          { new: true }
        );
        if (updatedCat) {
          let json_response = {
            status: true,
            message: "Category Updated Successfully",
            data: updatedCat,
          };
          return NextResponse.json(json_response);
        } else {
          return getErrorResponse(400, "Could not update category");
        }
      } catch (error) {
        return getErrorResponse(400, "Could not update category");
      }
    } else {
      return getErrorResponse(403, "Only Admins can edit category.");
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
        "Access-Control-Allow-Methods": "PATCH",
      },
    });
  }
}