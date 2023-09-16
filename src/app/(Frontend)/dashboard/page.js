'use client';

import Card from '@/Components/Card/Card';
import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import Graph from '@/Components/Graph/Graph';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi();
  }, []);

  const dashboardApi = () => {
    setLoading(true);
    makeHttpRequest(urls.dashboard, 'get')
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
  console.log(data);
  return (
    <div className="overflow-auto h-full text-[#0b1c48]">
      <div className="text-[28px] font-bold">Dashboard</div>
      <div className="flex gap-5 flex-wrap p-[20px]">
        <Card
          count={data.totalOrders ? data.totalOrders : '-'}
          title={'Total Orders'}
          subTitle={'All orders placed'}
        />
        <Card
          count={data.pendingOrders ? data.pendingOrders : '-'}
          title={'Pending Orders'}
          subTitle={'Orders awaiting processing'}
        />
        <Card
          count={data.completedOrders ? data.completedOrders : '-'}
          title={'Completed Orders'}
          subTitle={'Orders successfully processed'}
        />
      </div>
      <div className="flex gap-5 flex-wrap p-[20px]">
        <Graph
          title={'Order Trends Over Time'}
          timeSeriesData={data.orderTimeSeriesData}
        />
        <Graph
          title={'User Registration Trends Over Time'}
          timeSeriesData={data.userRegistrationTimeSeriesData}
        />
      </div>
      <FullScreenLoader open={loading} />
    </div>
  );
}
