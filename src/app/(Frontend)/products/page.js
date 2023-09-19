'use client';
import Input from '@/Components/Input/Input';
import ProductCards from '@/Containers/ProductCards/ProductCards';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { Add } from '@mui/icons-material';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [search, setSearch] = useState('');

  const router = useRouter();

  const groupedProducts = {};

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(onSearch, 300);
  }, []);

  useEffect(() => {
    productApi();
  }, [search]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const productApi = () => {
    setLoading(true);
    makeHttpRequest(
      `${urls.products}?${search !== '' ? `search=${search}&` : ''}`,
      'get'
    )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setData(res?.data?.products);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  data.forEach((product) => {
    const { category } = product;
    if (groupedProducts[category]) {
      groupedProducts[category].push(product);
    } else {
      groupedProducts[category] = [product];
    }
  });

  return (
    <div className="overflow-auto h-full text-[#0b1c48]">
      <div className="pl-[25px] pr-[20px] flex items-center flex-row w-full justify-between">
        <div className="text-[28px] font-bold ">Products</div>
        <div className="flex items-center gap-[20px]">
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
          <div
            className="rounded-full z-[999]  bg-slate-100 shadow-md w-[66px] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              router.push(`/addProduct`);
            }}
          >
            {' '}
            <Add sx={{ color: '#e47e52', fontSize: '26px' }} />
          </div>
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="p-[20px]">
          <div>
            {JSON.stringify(groupedProducts) !== '{}' &&
              Object.keys(groupedProducts).map((category, index) => {
                return (
                  <div key={index} className={`${index !== 0 && 'mt-[40px]'}`}>
                    <div className="text-[#e47e52] text-[18px] text-bold">
                      {category}
                    </div>
                    <div className="flex gap-[20px] flex-wrap pt-[20px]">
                      {groupedProducts[category].map((item, i) => {
                        return <ProductCards data={item} key={i} />;
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="h-[calc(100%-61.6px)] flex items-center justify-center text-[#e47e52] text-[26px]">
            No Products Found..!
          </div>
        )
      )}
    </div>
  );
};

export default Page;
