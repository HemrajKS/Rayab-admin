'use client';
import UserModal from '@/Containers/UserOrderModal/UserModal';
import UserTable from '@/Containers/UserTable/UserTable';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ open: false, order: [] });

  useEffect(() => {
    userApi();
  }, []);

  const userApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.users}`, 'get')
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const closeModal = () => {
    setModal({ open: false, order: [] });
  };
  return (
    <div className="overflow-auto h-full text-[#0b1c48] overflow-x-hidden">
      <div className="pl-[25px] pr-[20px] flex items-center flex-row w-full justify-between">
        <div className="text-[28px] font-bold ">Users</div>
      </div>
      <div className="p-[20px] overflow-x-auto">
        <UserTable
          data={data}
          infoClick={(orders) => {
            setModal({ open: true, order: orders });
          }}
        />
      </div>
      <UserModal
        open={modal.open}
        orders={modal.order ? modal.order : []}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Page;
