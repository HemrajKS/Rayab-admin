import { getErrorResponse } from '@/lib/helpers';
import { logout } from '@/lib/logout';
import connectDB from '@/lib/mongodb';
import { verifyJWT } from '@/lib/token';
import { verifyPass } from '@/lib/verifyPass';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    // const userId = req.headers.get('X-User-Id');
    let token = req.cookies.get('token')?.value;
    const userId = (await verifyJWT(token)).sub;

    const user = await UserModel.findOne({ _id: userId });
    const pass = await verifyPass(token, user.password);

    if (pass) {
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
    } else {
      return logout();
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
