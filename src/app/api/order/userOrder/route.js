import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import { verifyJWT } from '@/lib/token';
import Order from '@/models/order';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // const userId = req.headers.get('X-User-Id');

  // let token = req.cookies.get('token')?.value;
  // const userId = (await verifyJWT(token)).sub;
  let token;
  if (req.cookies.has('token')) {
    token = req.cookies.get('token')?.value;
  } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
    token = req.headers.get('Authorization')?.substring(7);
  } else {
    return getErrorResponse(
      401,
      'You are not loggen in, Please log in to proceed...'
    );
  }
  const { sub } = await verifyJWT(token);
  const userId = sub;

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
        ? await Order.findOne({ _id: _id })
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
        return NextResponse.json(json_response, {
          status: 200,
          headers: {
            'Access-Control-Allow-Methods': 'GET',
          },
        });
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
