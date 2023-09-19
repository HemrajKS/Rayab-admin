import { sendMail } from '@/app/services/mail';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import UserModel from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const userId = req.headers.get('x-user-id');
  try {
    await connectDB();
    const saveOrder = { ...body, ...{ userId: userId, orderDate: new Date() } };
    const newOrder = new Order(saveOrder);
    const savedOrder = await newOrder.save();
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { orders: savedOrder._id } },
      { new: true }
    );

    let json_response = {
      status: true,
      data: savedOrder,
      message:
        'Your order has been successfully submitted, and one of our representatives will be in touch with you shortly.',
    };
    await sendMail({
      to: 'hkshettigar123@gmail.com',
      message: `You have recieved a order from ${savedOrder.name}`,
      orderId: savedOrder._id,
      template: 'orderNotification',
    });
    return NextResponse.json(json_response);
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
