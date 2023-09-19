import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import Category from '@/models/category';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();

    const userId = await req.headers.get('User');
    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      try {
        const deleteCat = await Category.findOneAndDelete({ _id: body.id });
        if (deleteCat) {
          let json_response = {
            status: true,
            message: 'Category deleted successfully',
            data: deleteCat,
          };
          return NextResponse.json(json_response);
        } else {
          getErrorResponse(404, 'Category not found');
        }
      } catch (error) {
        return getErrorResponse(400, 'Could not delete category');
      }
      return getErrorResponse(400, 'Could not delete category');
    } else {
      return getErrorResponse(403, 'Only Admins can delete category.');
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
