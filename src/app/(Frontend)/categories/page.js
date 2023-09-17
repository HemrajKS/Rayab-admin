'use client';
import CategoryTable from '@/Containers/CategoryTable/CategoryTable';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    ordersApi();
  }, []);

  const ordersApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.categories}`, 'get')
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          setData(res?.data?.categories);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48]">
      <div className="pl-[25px] pr-[20px] flex items-center flex-row w-full justify-between">
        <div className="text-[28px] font-bold ">Categories</div>
      </div>
      <div className="pl-[20px] pt-[20px]">
        <CategoryTable data={data} />
      </div>
    </div>
  );
};

export default Page;
