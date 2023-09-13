import { sendMail } from '@/app/services/mail';
import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import Product from '@/models/product';
import User from '@/models/user';
import UserModel from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const userId = req.headers.get('x-user-id');
  try {
    await connectDB();
    const order = await Order.findOne({ _id: body.id });
    let orderNew = {};
    const user = await User.findOne({ _id: userId });

    if (user.isAdmin) {
      if (order.products && JSON.stringify(order.products) !== '[]') {
        if (body.status === 'completed') {
          for (const orderProduct of order.products) {
            await Product.findOneAndUpdate(
              {
                _id: orderProduct.product,
              },
              { $inc: { stock: -orderProduct.quantity } }
            );
          }
          orderNew = await Order.findOneAndUpdate(
            { _id: body.id },
            { status: 'completed' },
            { new: true }
          );
          let json_response = {
            status: true,
            data: orderNew,
            message: 'Order Completed Successfully',
          };

          return NextResponse.json(json_response);
        } else if (body.status === 'rejected') {
          orderNew = await Order.findOneAndUpdate(
            { _id: body.id },
            { status: 'rejected' },
            { new: true }
          );
          let json_response = {
            status: true,
            data: orderNew,
            message: 'Order Rejected Successfully',
          };

          return NextResponse.json(json_response);
        } else if (body.status === 'pending') {
          orderNew = await Order.findOneAndUpdate(
            { _id: body.id },
            { status: 'pending' },
            { new: true }
          );
          let json_response = {
            status: true,
            data: orderNew,
            message: 'Order Rejected Successfully',
          };
        }

        let json_response = {
          status: true,
          data: orderNew,
        };

        return NextResponse.json(json_response);
      } else {
        return getErrorResponse(404, 'Orders not found');
      }
    } else {
      return getErrorResponse(406, 'Only admins can change order status');
    }
  } catch (error) {
    if (error.code === 11000) {
      return getErrorResponse(406, 'Duplicate entries');
    }
    let json_response = {
      status: false,
      results: 'some error occured',
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  }
}