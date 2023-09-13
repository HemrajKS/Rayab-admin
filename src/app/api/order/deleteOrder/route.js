import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import User from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req) {
  const body = await req.json();
  try {
    await connectDB();
    const userId = req.headers.get('x-user-id');
    const user = await User.findOne({ _id: userId });

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
        message: 'Order deleted successfully',
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, 'Only admins can delete order ');
    }
  } catch (error) {
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
