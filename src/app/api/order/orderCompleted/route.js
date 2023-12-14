import { sendMail } from "@/app/services/mail";
import { getErrorResponse } from "@/lib/helpers";
import { logout } from "@/lib/logout";
import connectDB from "@/lib/mongodb";
import { verifyJWT } from "@/lib/token";
import { verifyPass } from "@/lib/verifyPass";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import UserModel from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
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
  const userId = (await verifyJWT(token))?.sub;

  try {
    await connectDB();
    const order = await Order.findOne({ _id: body.id });
    let orderNew = {};
    const user = await User.findOne({ _id: userId });
    let json_response = {};
    const pass = await verifyPass(token, user.password);

    if (pass) {
      if (user.isAdmin) {
        if (order.products && JSON.stringify(order.products) !== "[]") {
          if (body.status === "completed") {
            for (const orderProduct of order.products) {
              const quantityToDecrement = -orderProduct.quantity;
              await Product.findOneAndUpdate(
                {
                  _id: orderProduct.product,
                },
                { $inc: { stock: quantityToDecrement } }
              ).exec();
            }
            orderNew = await Order.findOneAndUpdate(
              { _id: body.id },
              { status: "completed" },
              { new: true }
            );

            await sendMail({
              to: order.email,
              productStatus: `Completed`,
              orderNumber: body.id,
              link: `${process.env.API_URL}/order/${body.id}`,
              template: "update",
            });

            const convertedProducts = order?.products?.map((product) => {
              return {
                link: `${process.env.API_URL}/reviews/${product.product}`,
              };
            });

            await sendMail({
              to: order.email,
              orderId: body.id,
              reviewLinks: convertedProducts,
              template: "review",
            });

            json_response = {
              status: true,
              data: orderNew,
              message: "Order Completed Successfully",
            };

            return NextResponse.json(json_response);
          } else if (body.status === "rejected") {
            orderNew = await Order.findOneAndUpdate(
              { _id: body.id },
              { status: "rejected" },
              { new: true }
            );
            json_response = {
              status: true,
              data: orderNew,
              message: "Order Rejected Successfully",
            };

            await sendMail({
              to: order.email,
              productStatus: `Rejected`,
              orderNumber: body.id,
              link: `${process.env.API_URL}/order/${body.id}`,
              template: "update",
            });

            return NextResponse.json(json_response);
          } else if (body.status === "pending") {
            orderNew = await Order.findOneAndUpdate(
              { _id: body.id },
              { status: "pending" },
              { new: true }
            );

            json_response = {
              status: true,
              data: orderNew,
              message: "Order status changed to Pending",
            };

            await sendMail({
              to: order.email,
              productStatus: `Pending`,
              orderNumber: body.id,
              link: `${process.env.API_URL}/order/${body.id}`,
              template: "update",
            });
            return NextResponse.json(json_response);
          } else {
            return getErrorResponse(404, "Orders not found");
          }
        } else {
          return getErrorResponse(406, "Only admins can change order status");
        }
      }
    } else {
      return logout();
    }
  } catch (error) {
    if (error.code === 11000) {
      return getErrorResponse(406, "Duplicate entries");
    }
    console.log("error", error);
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
