'use client';
import Input from '@/Components/Input/Input';
import TabBtns from '@/Components/TabBtns/TabBtns';
import OrderTable from '@/Containers/OrderTable/OrderTable';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');

  const tabs = ['all', 'pending', 'completed', 'rejected'];

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(onSearch, 300);
  }, []);

  useEffect(() => {
    ordersApi();
  }, [search]);

  useEffect(() => {
    ordersApi();
  }, [tab]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const ordersApi = () => {
    setLoading(true);
    makeHttpRequest(
      `${urls.orders}?${search !== '' ? `search=${search}&` : ''}${`${
        tab === 'all' ? '' : `status=${tab}`
      }`}`,
      'get'
    )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setData(res?.data?.orders);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const tabClick = (tabValue) => {
    if (tabValue !== tab) {
      setTab(tabValue);
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48]">
      <div className="pl-[25px] pr-[20px] flex items-center flex-row w-full justify-between">
        <div className="text-[28px] font-bold ">Orders</div>
        <TabBtns tabs={tabs} active={tab} tabClick={tabClick} />
        <div>
          {' '}
          <Input
            label={''}
            type={'text'}
            name={'email'}
            onChange={debouncedResults}
            // value={credentials.email}
            style={{ display: 'none' }}
            search={true}
          />
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="p-[20px]">
          <div className="flex gap-[20px] flex-wrap pt-[20px]">
            <OrderTable data={data} />
          </div>
        </div>
      ) : (
        !loading && (
          <div className="h-[calc(100%-61.6px)] flex items-center justify-center text-[#e47e52] text-[26px]">
            No Orders Found..!
          </div>
        )
      )}
    </div>
  );
};

export default Page;
