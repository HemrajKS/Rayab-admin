'use client';
import BasicModal from '@/Components/Modal/Modal';
import CategoryTable from '@/Containers/CategoryTable/CategoryTable';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [deleteCategory, setDeletCategory] = useState({
    open: false,
    cat: {},
  });

  useEffect(() => {
    categoryApi();
  }, []);

  const categoryApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.categories}`, 'get')
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setData(res?.data?.categories);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteCat = (cat) => {
    setDeletCategory((prev) => {
      return { ...prev, open: true, cat: cat };
    });
  };

  const cancel = () => {
    setDeletCategory((prev) => {
      return { ...prev, open: false, cat: {} };
    });
  };

  const deleteCatApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.deleteCategories}`, 'delete', {
      id: deleteCategory?.cat?._id,
    })
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          categoryApi();
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
        <CategoryTable data={data} deleteCat={deleteCat} />
      </div>
      <BasicModal
        open={deleteCategory.open}
        message={`Are you sure you want to delete the category ${deleteCategory?.cat?.name} ?`}
        func={deleteCatApi}
        cancel={cancel}
      />
    </div>
  );
};

export default Page;
