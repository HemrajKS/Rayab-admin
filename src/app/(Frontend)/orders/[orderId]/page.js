'use client';

import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { ArrowBack, Delete, Edit, Star } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Rating } from '@mui/material';
import RatingTable from '@/Containers/RatingTable/RatingTable';
import BasicModal from '@/Components/Modal/Modal';

const ProductId = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    orderApi();
  }, []);

  const orderApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.getOrders}?id=${params.orderId}`, 'get')
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.orders) {
            setData(res?.data?.orders);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log(data);

  const deleteOder = () => {
    setLoading(true);
    makeHttpRequest(`${urls.deleteProduct}`, 'delete', { id: params.productId })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          router.push('/products');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="pl-[25px] pr-[20px] relative mb-[25px]">
        <div className="flex justify-between items-center">
          <div
            className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              router.push('/orders');
            }}
          >
            <ArrowBack sx={{ color: '#e47e52', fontSize: '26px' }} />
          </div>
          <div className="flex gap-[20px]">
            <div
              className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <Delete sx={{ color: '#f05454', fontSize: '26px' }} />
            </div>
          </div>
        </div>
        {JSON.stringify(data) !== '{}' ? (
          <div className="mt-[20px]">
            <div className="flex gap-[20px] flex-wrap">
              <div className="bg-white rounded-[16px] flex flex-col shadow-md max-h-[calc(100vh-106px)] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] h-[100%] p-[20px]">
                <div className="flex items-start flex-col ">
                  <div className="text-bold text-2xl">ID: {data._id}</div>
                  {data.name && (
                    <div className="text-bold text-[18px] mb-[8px] mt-[10px]">
                      Ordered By:{' '}
                      <span className=" text-[#e47e52]">{data.name}</span>
                    </div>
                  )}
                  {data.totalPrice && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Worth:{' '}
                      <span className=" text-[#e47e52]">
                        {' '}
                        {data.currency ? data.currency : 'INR'}{' '}
                        {data.totalPrice}
                      </span>
                    </div>
                  )}

                  {data.email && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Email Id:{' '}
                      <span className=" text-[#e47e52]"> {data.email}</span>
                    </div>
                  )}

                  {data.phone1 && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Phone No #1:{' '}
                      <span className=" text-[#e47e52]"> {data.phone1}</span>
                    </div>
                  )}

                  {data.phone2 && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Phone No #2:{' '}
                      <span className=" text-[#e47e52]"> {data.phone2}</span>
                    </div>
                  )}

                  {data.orderDate && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Ordered Date:{' '}
                      <span className=" text-[#e47e52]">
                        {' '}
                        {new Date(data.orderDate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {data.updatedAt && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Last Updated:{' '}
                      <span className=" text-[#e47e52]">
                        {' '}
                        {new Date(data.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-[16px] shadow-md overflow-auto xl:max-h-[calc(494px)] xl:h-[494px] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] p-[20px]">
                <div className="text-bold text-[18px] mb-[14px]">
                  {data.currency ? data.currency : 'INR'} {data.price}
                </div>
                {data.model && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Model:</span> {data.model}
                  </div>
                )}
                {data.features && (
                  <div className="mb-[8px]">
                    <div className="font-bold">Features:</div>
                    {data.features.map((feat, i) => {
                      return (
                        <div key={i} className="pl-[16px]">
                          {i + 1}. {feat}
                        </div>
                      );
                    })}
                  </div>
                )}
                {data.color && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Color:</span> {data.color}
                  </div>
                )}
                {data.weight && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Weight:</span> {data.weight}
                  </div>
                )}
                {data.dimensions && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Dimensions:</span>{' '}
                    {data.dimensions}
                  </div>
                )}
                {data.shippingInfo && (
                  <div className="mb-[8px]">
                    <div className="font-bold">Shipping Info:</div>
                    {Object.keys(data.shippingInfo).map((obj, i) => {
                      return (
                        <div key={i} className="pl-[16px]">
                          <span>{_.startCase(obj)}</span>:{' '}
                          {data.shippingInfo[obj]}
                        </div>
                      );
                    })}
                  </div>
                )}
                {data.warranty && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Warranty:</span> {data.warranty}
                  </div>
                )}
                {data.manufacturer && (
                  <div className="mb-[8px]">
                    <span className="font-bold">Manufacturer:</span>{' '}
                    {data.manufacturer}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-[16px] shadow-md mt-[20px] p-[20px]">
              <div className="flex items-center justify-between">
                <div className="text-[26px] font-bold">Reviews</div>
                <div className="flex gap-[8px] items-center text-[#e47e52] text-bold text-[20px]">
                  <Rating
                    name="text-feedback"
                    value={data.rating}
                    readOnly
                    precision={0.1}
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    sx={{
                      color: '#e47e52',
                      fontSize: '28px',
                    }}
                  />
                  <div>{data.rating}</div>
                </div>
              </div>
              <RatingTable data={data.reviews} />
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
      <BasicModal
        open={deleteModal}
        message={'Are you sure, you want to delete this Order?'}
        // func={deleteProduct}
        cancel={() => {
          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default ProductId;
