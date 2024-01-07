'use client';
import BasicModal from '@/Components/Modal/Modal';
import CategoryForm from '@/Containers/CategoryForm/CategoryForm';
import CategoryTable from '@/Containers/CategoryTable/CategoryTable';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { Add } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({
    open: '',
    cat: {},
  });

  const [editCategory, setEditCategory] = useState({
    name: '',
    description: '',
    subCategories: [],
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

  const catObj = (cat, type) => {
    setCategory((prev) => {
      return { ...prev, open: type, cat: cat };
    });

    if (type === 'edit' || type === 'add') {
      setEditCategory((prev) => {
        return {
          ...prev,
          name: cat.name,
          description: cat.description,
          subCategories: cat?.subCategories || [],
        };
      });
    }
  };

  const cancel = () => {
    setCategory((prev) => {
      return { ...prev, open: false, cat: {} };
    });
  };

  const deleteCatApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.deleteCategories}`, 'post', {
      id: category?.cat?._id,
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

  const editCatApi = () => {
    if (editCategory.name !== '' && editCategory.description !== '') {
      setLoading(true);
      makeHttpRequest(
        `${
          { edit: urls.editCategories, add: urls.addCategories }[category.open]
        }`,
        { edit: 'patch', add: 'post' }[category.open],
        {
          edit: {
            id: category?.cat?._id,
            ...editCategory,
          },
          add: editCategory,
        }[category.open]
      )
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
    }
  };

  const onChange = (e) => {
    if (e.target.name === 'subCategory') {
      if (e.target.value) {
        setEditCategory((prev) => {
          return {
            ...prev,
            subCategories: [...prev.subCategories, e.target.value],
          };
        });
      }
    } else {
      setEditCategory((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] overflow-x-hidden">
      <div className="pl-[25px] pr-[20px] flex items-center flex-row w-full justify-between">
        <div className="text-[28px] font-bold ">Categories</div>
        <div
          className="rounded-full bg-white shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            catObj({ name: '', description: '' }, 'add');
          }}
        >
          <Add sx={{ color: '#0b1c48', fontSize: '26px' }} />
        </div>
      </div>
      <div className="p-[20px] overflow-x-auto">
        <CategoryTable data={data} catObj={catObj} />
      </div>
      <BasicModal
        open={category.open === 'delete'}
        message={`Are you sure you want to delete the category ${category?.cat?.name} ?`}
        func={deleteCatApi}
        cancel={cancel}
      />
      <BasicModal
        open={category.open === 'edit' || category.open === 'add'}
        message={
          <CategoryForm editCategory={editCategory} onChange={onChange} />
        }
        func={editCatApi}
        cancel={cancel}
        yesBtn={'Submit'}
        noBtn={'Cancel'}
      />
    </div>
  );
};

export default Page;
