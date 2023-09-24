import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import { verifyJWT } from '@/lib/token';
import Category from '@/models/category';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();

    // const userId = await req.headers.get('X-User-Id');

    let token = req.cookies.get('token')?.value;
    const userId = (await verifyJWT(token)).sub;
    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      await Category.deleteOne({ _id: body.id });
      let json_response = {
        status: true,
        message: 'Category deleted successfully',
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, 'Only Admins can delete category.');
    }
  } catch (error) {
    console.log(error);
    throw error; // Let the error propagate for proper error handling.
  }
}
