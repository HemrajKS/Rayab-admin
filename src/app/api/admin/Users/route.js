import { getErrorResponse } from '@/lib/helpers';
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const userId = req.headers.get('User');

    const user = await UserModel.findOne({ _id: userId });
    if (user.isAdmin) {
      const users = await UserModel.find({}).select('-password');

      let json_response = {
        status: true,
        message: 'User data',
        data: users,
      };
      return NextResponse.json(json_response);
    } else {
      return getErrorResponse(403, 'Only Admins can get user data');
    }
  } catch (error) {
    console.log(error);
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
