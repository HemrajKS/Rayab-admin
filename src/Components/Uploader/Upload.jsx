import { UploadFile } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

const Upload = ({
  onDropHandler,
  url,
  uploadImgLoading,
  images,
  type,
  label,
  requiredStar,
}) => {
  const onDrop = (acceptedFiles) => {
    onDropHandler(acceptedFiles, type);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="mb-[20px] mt-[4px]">
      <div className="text-[16px] opacity-[0.8] text-[#0b1c48] mb-[4px]">
        {label} {requiredStar && <span style={{ color: "red" }}>*</span>}
      </div>
      <div className="flex flex-col items-center border-[1px] p-[20px] border-slate-300 rounded-md">
        <>
          <div
            {...getRootProps()}
            className="dropzone flex items-center flex-col"
          >
            <input {...getInputProps()} />
            <div className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
              <UploadFile sx={{ color: "#e47e52" }} />
              <input hidden accept="image/*" multiple={false} type="file" />
            </div>
            <p>Drag & drop an image here, or click to select one</p>
          </div>
          <div className="flex justify-center overflow-auto">
            {
              {
                mainImage: url && (
                  <Image
                    src={url}
                    alt="Selected"
                    width={500}
                    height={500}
                    className="h-[200px] w-[200px] object-cover align-middle rounded-[8px] mt-[12px]"
                  />
                ),
                otherImages: (
                  <div className="flex items-center gap-[20px]">
                    {images &&
                      images.map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          alt="Selected"
                          width={500}
                          height={500}
                          className="h-[200px] w-[200px] object-cover align-middle rounded-[8px] mt-[12px]"
                        />
                      ))}
                  </div>
                ),
              }[type]
            }
          </div>
        </>
      </div>
      <FullScreenLoader open={uploadImgLoading} />
    </div>
  );
};

export default Upload;
