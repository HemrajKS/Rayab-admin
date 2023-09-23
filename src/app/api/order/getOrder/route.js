import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import User from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function GET(req) {
  try {
    await connectDB();
    const userId = req.headers.get('User');

    const user = await User.findOne({ _id: userId });
    const searchQuery = req.nextUrl.searchParams.get('search') || '';
    const statusFilter = req.nextUrl.searchParams.get('status') || '';
    const id = req.nextUrl.searchParams.get('id') || null;

    if (user && user.isAdmin) {
      let searchCriteria = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phone1: { $regex: searchQuery, $options: 'i' } },
          { phone2: { $regex: searchQuery, $options: 'i' } },
        ],
      };
      const orderCount = !id && (await Order.countDocuments(searchCriteria));
      const skip = JSON.parse(req.nextUrl.searchParams.get('skip'))
        ? JSON.parse(req.nextUrl.searchParams.get('skip'))
        : 0;
      const limit = JSON.parse(req.nextUrl.searchParams.get('limit'))
        ? JSON.parse(req.nextUrl.searchParams.get('limit'))
        : orderCount;

      if (statusFilter) {
        searchCriteria.status = statusFilter;
      }

      const order = id
        ? await Order.findOne({ _id: id })
        : await Order.find(searchCriteria).skip(skip).limit(limit);
      if (order) {
        let json_response = {
          status: true,
          orders: order,
          ...(!id && { total: orderCount }),
        };
        return NextResponse.json(json_response, {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow requests from localhost
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User',
          },
        });
      } else {
        return getErrorResponse(404, 'Order not found');
      }
    } else {
      return getErrorResponse(403, 'Please login as admin');
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
