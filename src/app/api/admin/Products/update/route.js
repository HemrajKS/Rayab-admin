import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();

    const userId = req.headers.get('User-Id');
    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      try {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: body.id },
          body,
          { new: true }
        );
        if (updatedProduct) {
          let json_response = {
            status: true,
            message: 'Product Updated Successfully',
            data: updatedProduct,
          };
          return NextResponse.json(json_response);
        } else {
          return getErrorResponse(400, 'Could not update product');
        }
      } catch (error) {
        return getErrorResponse(400, 'Could not update product');
      }
    } else {
      return getErrorResponse(403, 'Only Admins can edit products.');
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
        'Access-Control-Allow-Methods': 'PATCH',
      },
    });
  }
}
