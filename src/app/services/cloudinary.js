import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function upload(img, name) {
  var uploadData = {};
  const bytes = await img.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const isPdf = img.type === 'application/pdf';

  const uploadFn = () => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'images',
          resource_type: isPdf ? 'raw' : 'image',
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  };

  const data = await uploadFn();

  return data?.secure_url;
}
