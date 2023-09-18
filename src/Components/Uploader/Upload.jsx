import { UploadFile } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import Image from 'next/image';

const Upload = ({ onDrop, url, uploadImgLoading }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div>
      <div className="text-[16px] opacity-[0.8] text-[#0b1c48] mb-[4px]">
        Label
      </div>
      <div className="flex flex-col items-center border-[1px] p-[20px] border-slate-300 rounded-md">
        {!uploadImgLoading ? (
          <>
            <div
              {...getRootProps()}
              className="dropzone flex items-center flex-col"
            >
              <input {...getInputProps()} />
              <div className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                <UploadFile sx={{ color: '#e47e52' }} />
                <input hidden accept="image/*" multiple={false} type="file" />
              </div>
              <p>Drag & drop an image here, or click to select one</p>
            </div>
            <div className="flex justify-center">
              <Image
                src={url}
                alt="Selected"
                width={500}
                height={500}
                className="h-[200px] w-[200px] object-contain align-middle"
              />
            </div>
          </>
        ) : (
          'loading'
        )}
      </div>
    </div>
  );
};

export default Upload;
