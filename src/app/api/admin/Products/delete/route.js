import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();

    const userId = req.headers.get('User-Id');
    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      try {
        const deleteProduct = await Product.findOneAndDelete({ _id: body.id });
        if (deleteProduct) {
          let json_response = {
            status: true,
            message: 'Product deleted successfully',
            data: deleteProduct,
          };
          return NextResponse.json(json_response);
        } else {
          getErrorResponse(404, 'Product not found');
        }
        return getErrorResponse(400, 'Could not delete product');
      } catch (error) {
        return getErrorResponse(400, 'Could not delete product');
      }
    } else {
      return getErrorResponse(403, 'Only Admins can delete products.');
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
        'Access-Control-Allow-Methods': 'DELETE',
      },
    });
  }
}
