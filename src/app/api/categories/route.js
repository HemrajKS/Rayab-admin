import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Category from '@/models/category';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request) {
  const id = request.nextUrl.searchParams.get('id') || null;
  try {
    await connectDB();

    const category = id
      ? await Category.findOne({ _id: id })
      : await Category.find({});
    if (category) {
      let json_response = {
        status: true,
        categories: category,
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(404, 'Category not found');
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
