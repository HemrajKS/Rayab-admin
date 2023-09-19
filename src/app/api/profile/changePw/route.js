import { getErrorResponse } from '@/lib/helpers';
import { compare, hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import UserModel from '@/models/user';
import connectDB from '@/lib/mongodb';

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const userId = req.headers.get('User');
    const user = await UserModel.findOne({
      _id: userId,
    });
    const hashedPassword = await hash(body.newPw, 12);

    if (body.oldPw && body.newPw && body.cPw) {
      if (user) {
        if (body.newPw === body.cPw) {
          if (await compare(body.oldPw, user.password)) {
            const newPassword = await UserModel.findOneAndUpdate(
              { _id: userId },
              { password: hashedPassword },
              { new: true }
            ).select('-password');
            let json_response = {
              status: true,
              message: 'Password changed successfully',
              data: { newPassword },
            };
            return NextResponse.json(json_response);
          } else {
            return getErrorResponse(401, 'Different old password');
          }
        } else {
          return getErrorResponse(401, 'Passwords are not matching');
        }
      } else {
        return getErrorResponse(400, 'User not found');
      }
    } else {
      return getErrorResponse(400, 'Please Enter all the required fields');
    }
  } catch (error) {
    return getErrorResponse(500, error.message);
  }
}
