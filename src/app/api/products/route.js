import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import Product from '@/models/product';
import connectDB from '@/lib/mongodb';

export async function GET(request) {
  try {
    await connectDB();

    const queryId = request.nextUrl.searchParams.get('id');

    const search = request.nextUrl.searchParams.get('search');

    const searchCriteria = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ],
    };

    const totalProducts = search
      ? await Product.countDocuments(searchCriteria)
      : await Product.count();

    const skip = JSON.parse(request.nextUrl.searchParams.get('skip'))
      ? JSON.parse(request.nextUrl.searchParams.get('skip'))
      : 0;
    const limit = JSON.parse(request.nextUrl.searchParams.get('limit'))
      ? JSON.parse(request.nextUrl.searchParams.get('limit'))
      : totalProducts;

    const products = queryId
      ? await Product.findOne({ _id: queryId })
      : search
      ? await Product.find(searchCriteria, {}, { skip, limit })
      : await Product.find({}, {}, { skip, limit });

    let json_response = {
      status: true,
      products: products,
      totalCount: totalProducts,
    };
    return NextResponse.json(json_response, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from localhost
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, User', // Allow multiple headers
      },
    });
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
