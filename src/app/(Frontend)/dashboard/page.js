'use client';

import Card from '@/Components/Card/Card';
import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import Graph from '@/Components/Graph/Graph';
import ProductCards from '@/Components/ProductCards/ProductCards';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
      <div className="text-[28px] font-bold pl-[25px]">Dashboard</div>
      <div className="flex gap-[18px] flex-wrap p-[20px]">
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
      <div className="flex gap-[20px] flex-wrap p-[20px]">
        <Graph
          title={'Order Trends Over Time'}
          timeSeriesData={data.orderTimeSeriesData}
          xLabel="Time"
          yLabel="Orders"
        />
        <Graph
          title={'User Registration Trends Over Time'}
          timeSeriesData={data.userRegistrationTimeSeriesData}
          xLabel="Time"
          yLabel="User Reg."
        />
      </div>
      <div className="p-[20px]">
        <div className="flex justify-between">
          <div className="font-bold text-[18px]">
            Newest Additions to Our Product Catalog
          </div>
          <div
            className="cursor-pointer text-[#e47e52]"
            onClick={() => {
              router.push('/products');
            }}
          >
            Browse All
          </div>
        </div>
        <div className="flex gap-[20px] flex-wrap pt-[20px]">
          {data?.latestProducts?.map((product, i) => {
            return (
              <>
                <ProductCards data={product} index={i} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
