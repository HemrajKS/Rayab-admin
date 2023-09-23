import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import { verifyJWT } from '@/lib/token';
import Category from '@/models/category';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    // const userId = req.headers.get('X-User-Id');
    let token = req.cookies.get('token')?.value;
    const userId = (await verifyJWT(token)).sub;
    const catObj = { ...body, addedBy: userId };

    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      const newCat = new Category(catObj);
      const savedCat = await newCat.save();
      let json_response = {
        status: true,
        message: 'Category added successfully',
        data: savedCat,
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, 'Only Admins can add category.');
    }

    let json_response = {
      status: true,
      message: 'Category added successfully',
      data: { user, userId: userId },
    };
    return NextResponse.json(json_response);
  } catch (error) {
    if (error.code === 11000) {
      let json_response = {
        status: false,
        results: 'Duplicate Entry',
        error: error,
      };
      return NextResponse.json(json_response, {
        status: 403,
        headers: {
          'Access-Control-Allow-Methods': 'POST',
        },
      });
    }
    let json_response = {
      status: false,
      results: 'Enter all required fields',
      error: error.message,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }
}
