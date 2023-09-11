import connectDB from '@/lib/mongodb';
import Category from '@/models/category';
import { NextResponse, NextRequest } from 'next/server';;

export async function GET(request) {
  try {
    await connectDB()
    const category = await Category.find({});
    let json_response = {
      status: true,
      categories: category,
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
