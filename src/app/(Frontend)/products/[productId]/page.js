'use client';
import TabBtns from '@/Components/TabBtns/TabBtns';
import ImageGallery from '@/Containers/ImageGallery/ImageGallery';
import Video from '@/Containers/Video/Video';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const ProductId = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState('images');

  const mediaTabs = ['images', 'video'];

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

  console.log('data', data);

  function transformProductImages(product) {
    const images = [
      {
        original: product.imageUrl,
        thumbnail: product.imageUrl,
      },
    ];

    images.push(
      ...product.images.map((image) => ({
        original: image,
        thumbnail: image,
      }))
    );

    return images;
  }

  const tabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="pl-[25px] pr-[20px] relative mb-[25px]">
        <div
          className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            router.push('/products');
          }}
        >
          <ArrowBack sx={{ color: '#e47e52', fontSize: '26px' }} />
        </div>
        {JSON.stringify(data) !== '{}' ? (
          <div className="mt-[20px]">
            <div className="flex gap-[20px] flex-wrap">
              <div className="bg-white rounded-[16px] flex flex-col items-center shadow-md max-h-[calc(100vh-106px)] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] h-[100%] p-[20px]">
                <div className="w-fit mb-[15px]">
                  <TabBtns
                    tabs={mediaTabs}
                    active={activeTab}
                    tabClick={tabClick}
                  />
                </div>
                {
                  {
                    images: (
                      <ImageGallery images={transformProductImages(data)} />
                    ),
                    video: <Video url={data.productVideo} />,
                  }[activeTab]
                }
              </div>
              <div className="bg-white rounded-[16px] shadow-md overflow-auto xl:max-h-[calc(494px)] xl:h-[494px] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] p-[20px]">
                <div className="flex items-start justify-between">
                  <div className="text-bold text-[28px]">{data.name}</div>
                  <div className="ml-[20px] text-bold text-[20px] bg-[#e47e52] text-white px-[14px] py-[2px] rounded-[10px]">
                    {data.stock}
                  </div>
                </div>
                <div className="text-[#e47e52] text-[14px] font-thin">
                  {data.category}
                </div>
                <div className="mb-[14px] text-gray-400 ">
                  {data.description}
                </div>
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
