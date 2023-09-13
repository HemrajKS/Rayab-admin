import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  const body = await req.json();
  const userId = req.headers.get('x-user-id');
  try {
    await connectDB();
    const reviewUser = { ...body, ...{ user: userId } };

    const review = await Product.findOneAndUpdate(
      {
        _id: body.productId,
      },
      { $push: { reviews: reviewUser } },
      { new: true }
    );

    let json_response = {
      status: true,
      data: review,
      message: 'Review has been added successfully',
    };

    return NextResponse.json(json_response);
  } catch (error) {
    let json_response = {
      status: false,
      results: 'could not update reviews',
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        'Access-Control-Allow-Methods': 'PATCH',
      },
    });
  }
}