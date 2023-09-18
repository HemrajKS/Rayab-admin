'use client';
import ProductForm from '@/Containers/ProductForm/ProductForm';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const router = useRouter();
  const { productId } = params;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productApi();
  }, []);

  const productApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.products}?id=${params.productId}`, 'get')
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.products) {
            setData(res?.data?.products);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex justify-between items-center">
          <div
            className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              router.push(`/products/${productId}`);
            }}
          >
            {' '}
            <ArrowBack sx={{ color: '#e47e52', fontSize: '26px' }} />
          </div>
        </div>
        <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] h-[calc(100vh-192px)] overflow-auto">
          {JSON.stringify(data) !== '{}' ? (
            <div className="h-full ">
              <ProductForm data={data} edit />
            </div>
          ) : (
            !loading && (
              <div className="flex items-center justify-center text-[#e47e52] text-[26px] h-full">
                Product Not Found..!
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
