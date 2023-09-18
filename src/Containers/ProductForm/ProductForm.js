import Dropdown from '@/Components/Dropdown/Dropdown';
import Input from '@/Components/Input/Input';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { sanitizeProduct } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

const ProductForm = ({ data, edit }) => {
  const fieldsToRemove = [
    'addedBy',
    '__v',
    'createdAt',
    'updatedAt',
    'reviews',
  ];

  const [categories, setCategories] = useState([]);
  const [categoriesload, setCategoriesLoad] = useState([]);
  const [submitObj, setSubmitObj] = useState(
    sanitizeProduct(data, fieldsToRemove)
  );
  console.log(submitObj);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubmitObj({
      ...submitObj,
      [name]: value,
    });
  };

  useEffect(() => {
    categoryApi();
  }, []);

  const categoryApi = () => {
    setCategoriesLoad(true);
    makeHttpRequest(`/api/categories`, 'get')
      .then((res) => {
        setCategoriesLoad(false);
        if (res.status === 200) {
          if (res?.data?.categories) {
            setCategories(res?.data?.categories);
          }
        }
      })
      .catch((err) => {
        setCategoriesLoad(false);
        console.log(err);
      });
  };

  return (
    <form>
      <Input
        name={'name'}
        label={'Name'}
        value={submitObj.name}
        onChange={handleChange}
        required
      />
      <Dropdown
        name={'category'}
        value={submitObj.category}
        onChange={handleChange}
        list={categories}
        label="Category"
      />
    </form>
  );
};

export default ProductForm;
