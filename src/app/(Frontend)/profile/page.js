'use client';
import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const profile = () => {
    makeHttpRequest(`${urls.profile}`, 'get')
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.data) {
            setData(res?.data?.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">Profile Page</div>
          <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] flex items-center flex-wrap gap-[18px]">
            <AccountCircle
              sx={{ fontSize: '150px', color: 'slate', opacity: '0.4' }}
            />
            <div>
              <div>
                {data.username && (
                  <span className="text-[28px]">{data.username}</span>
                )}
              </div>
              <div>
                {data.firstName && <span>{data.firstName}</span>}{' '}
                {data.lastName && <span>{data.lastName}</span>}
              </div>
              <div className="text-slate-400">
                {data.email && <span>{data.email}</span>}
              </div>
              {data.isAdmin && <div className="text-[#e47e52]">Admin</div>}
            </div>
          </div>
        </div>
      </div>
      {/* <FullScreenLoader open={loading} /> */}
    </div>
  );
};

export default Page;
