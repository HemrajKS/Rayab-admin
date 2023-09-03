import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('Rayab');

    const Product = await db.collection('Products');
    const totalProducts = await Product.count();
    const skip = JSON.parse(request.nextUrl.searchParams.get('skip'))
      ? JSON.parse(request.nextUrl.searchParams.get('skip'))
      : 0;
    const limit = JSON.parse(request.nextUrl.searchParams.get('limit'))
      ? JSON.parse(request.nextUrl.searchParams.get('limit'))
      : totalProducts;
    const queryId = request.nextUrl.searchParams.get('id');
    const id = new ObjectId(queryId);

    const products = queryId
      ? await Product.find({ _id: id }).toArray()
      : await Product.find({}).limit(limit).skip(skip).toArray();

    let json_response = {
      status: true,
      products: products,
      totalCount: totalProducts,
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
