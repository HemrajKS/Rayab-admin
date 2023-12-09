import { getErrorResponse } from '@/lib/helpers';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import UserModel from '@/models/user';
import connectDB from '@/lib/mongodb';
import { sendMail } from '@/app/services/mail';
import { generateOTP } from '@/app/services/otp';
import Verify from '@/models/verification';

export async function POST(req) {
  const isAdmin = false;
  try {
    await connectDB();
    const body = await req.json();
    const user = await UserModel.findOne({
      email: body.email,
      username: body.username,
    });
    const hashedPassword = await hash(body.password, 12);

    if (
      body.username &&
      body.email &&
      body.password &&
      body.cpassword &&
      body.firstName
    ) {
      if (user) {
        return getErrorResponse(400, 'User already exist');
      } else {
        if (body.password === body.cpassword) {
          if (isAdmin == false) {
            try {
              const otp = generateOTP();
              const hashedOtp = await hash(otp, 12);
              const copiedObject = {
                ...body,
                password: hashedPassword,
                isAdmin,
                cpassword: undefined,
                isActive: false,
              };
              delete copiedObject.cpassword;
              const newUser = new UserModel(copiedObject);
              const savedUser = await newUser.save();
              try {
                const verificationObj = {
                  _id: savedUser._id,
                  email: savedUser.email,
                  otp: hashedOtp,
                };
                const verification = new Verify(verificationObj);
                await verification.save();
              } catch (error) {
                console.log(error);
              }

              const sanitizedNewUser = { ...savedUser.toObject() };
              delete sanitizedNewUser.password;
              await sendMail({ to: body.email, otp, template: 'otpTemplate' });
              return new NextResponse(
                JSON.stringify({
                  status: 'success',
                  message: 'OTP has been sent to your email',
                  data: sanitizedNewUser,
                }),
                {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.API_URL,
                  },
                }
              );
            } catch (error) {
              if (error.code === 11000) {
                return getErrorResponse(406, 'Duplicate entries');
              }
              return getErrorResponse(500, 'Sorry!, Could not register');
            }
          }
        } else {
          return getErrorResponse(401, 'Passwords are not matching');
        }
      }
    } else {
      return getErrorResponse(400, 'Please Enter all the required fields');
    }

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { user: { user, password: undefined } },
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': process.env.API_URL,
        },
      }
    );
  } catch (error) {
    if (error.code === 'P2002') {
      return getErrorResponse(409, 'user with that email already exists');
    }

    return getErrorResponse(500, error.message);
  }
}
