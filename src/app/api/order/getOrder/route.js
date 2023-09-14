import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const orderCount = await Order.count();
    const skip = JSON.parse(req.nextUrl.searchParams.get('skip'))
      ? JSON.parse(req.nextUrl.searchParams.get('skip'))
      : 0;
    const limit = JSON.parse(req.nextUrl.searchParams.get('limit'))
      ? JSON.parse(req.nextUrl.searchParams.get('limit'))
      : orderCount;

    const order = await Order.find().skip(skip).limit(limit).exec();

    let json_response = {
      status: true,
      orders: order,
      total: orderCount,
    };
    return NextResponse.json(json_response);
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
