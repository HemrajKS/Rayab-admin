import upload from '@/app/services/cloudinary';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request) {
  // const formData = await form.parse(request);

  const formData = await request.formData();
  const name = await formData.get('name');
  const image = await formData.get('image');

  try {
    const uploadData = await upload(image, name);
    let json_response = {
      status: true,
      data: uploadData,
    };
    return NextResponse.json(json_response);
  } catch (error) {
    let json_response = {
      status: false,
      message: 'Some error occured',
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }
}
