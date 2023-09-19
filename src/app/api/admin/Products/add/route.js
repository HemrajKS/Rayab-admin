import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const userId = req.headers.get('User');
    const productObj = { ...body, addedBy: userId };

    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      const newProduct = new Product(productObj);
      const savedProduct = await newProduct.save();
      let json_response = {
        status: true,
        message: 'Product added successfully',
        data: savedProduct,
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, 'Only Admins can add products.');
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
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }
}
