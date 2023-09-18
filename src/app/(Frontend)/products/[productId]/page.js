'use client';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductId = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

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
            setData();
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log('data', data, JSON.stringify(data) !== '{}');
  return (
    <div className="overflow-auto h-full text-[#0b1c48]">
      <div className="pl-[25px] pr-[20px] relative">
        <div
          className="rounded-full absolute top-[10px] left-[40px] bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            router.push('/products');
          }}
        >
          <ArrowBack sx={{ color: '#e47e52', fontSize: '26px' }} />
        </div>
        {JSON.stringify(data) !== '{}' ? (
          <div>
            <div className="flex gap-[20px] flex-wrap">
              <div className="bg-white rounded-[16px] max-h-[calc(100vh-106px)] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] h-[100%] p-[20px]">
                cbx kjb dgdlbgjfd dfvd;oin
              </div>
              <div className="bg-white rounded-[16px] max-h-[calc(100vh-106px)] h-[100%] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] p-[20px]">
                cbx kjb dgdlbgjfd dfvd;oin
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="h-[calc(100vh-106px)] flex items-center justify-center text-[#e47e52] text-[26px]">
              Product Not Found..!
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductId;
