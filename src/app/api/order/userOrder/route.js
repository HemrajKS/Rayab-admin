import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const userId = req.headers.get('X-User-Id');
  const statusFilter = req.nextUrl.searchParams.get('status') || '';
  const searchQuery = req.nextUrl.searchParams.get('search') || '';
  const _id = req.nextUrl.searchParams.get('id') || null;

  try {
    await connectDB();
    let searchCriteria = {};
    if (userId) {
      if (statusFilter) {
        searchCriteria = {
          $or: [{ status: { $regex: statusFilter, $options: 'i' } }],
        };
      }
      const orderCount = !_id && (await Order.countDocuments(searchCriteria));
      const skip = JSON.parse(req.nextUrl.searchParams.get('skip'))
        ? JSON.parse(req.nextUrl.searchParams.get('skip'))
        : 0;
      const limit = JSON.parse(req.nextUrl.searchParams.get('limit'))
        ? JSON.parse(req.nextUrl.searchParams.get('limit'))
        : orderCount;

      const order = _id
        ? await Order.findOne({ userId, _id: new mongoose.Types.ObjectId(_id) })
        : await Order.find({ userId, ...searchCriteria })
            .skip(skip)
            .limit(limit);
      if (order) {
        let json_response = {
          status: true,
          orders: order,
          ...(!_id && { total: orderCount }),
          results: _id
            ? 'Order Found'
            : order.length > 0
            ? 'Found Orders'
            : 'No Orders found',
        };
        return NextResponse.json(json_response);
      } else {
        return getErrorResponse(404, 'Order not found');
      }
    } else {
      return getErrorResponse(403, 'You must be logged in');
    }
  } catch (error) {
    console.log(error);
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
