'use client';
import { ArrowBack } from '@mui/icons-material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/Containers/ProductForm/ProductForm';
import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import makeHttpRequest from '@/app/services/apiCall';
import { urls } from '@/app/constants/constants';

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitObj, setSubmitObj] = useState({});

  const submitData = (data) => {
    setSubmitObj(data);
  };

  const addApi = () => {
    setLoading(true);
    if (
      submitObj.name !== '' &&
      submitObj.description !== '' &&
      submitObj.category !== '' &&
      submitObj.price !== '' &&
      submitObj.currency !== '' &&
      submitObj.stock !== '' &&
      submitObj.imageUrl !== ''
    ) {
      makeHttpRequest(`${urls.postProduct}`, 'post', submitObj)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            if (res?.data?.data) {
              router.push(`/products`);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      alert('Please enter all the required fields..!');
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div
              className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                router.push(`/products`);
              }}
            >
              {' '}
              <ArrowBack sx={{ color: '#e47e52', fontSize: '26px' }} />
            </div>
            <div
              className="cursor-pointer bg-[#e47e52] rounded-md text-white font-bold text-[18px] px-[18px] py-[6px] tracking-[1.5px]"
              onClick={() => {
                addApi();
              }}
            >
              Save
            </div>
          </div>
          <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] h-[calc(100vh-212px)] overflow-auto">
            <div className="h-full ">
              <ProductForm data={{}} edit submitData={submitData} />
            </div>
          </div>
        </div>
      </div>
      <FullScreenLoader open={loading} />
    </div>
  );
};

export default Page;
