import Dropdown from '@/Components/Dropdown/Dropdown';
import Input from '@/Components/Input/Input';
import Textarea from '@/Components/Textarea/Textarea';
import makeHttpRequest from '@/app/services/apiCall';
import { sanitizeProduct } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import Upload from '@/Components/Uploader/Upload';

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
  const [uploadImgLoading, setUploadImgLoading] = useState(false);
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

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setUploadImgLoading(true);
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', 'Product Image');

      makeHttpRequest;
      makeHttpRequest(`/api/upload`, 'post', formData)
        .then((res) => {
          setUploadImgLoading(false);
          console.log(res);
          if (res.status === 200) {
            if (res?.data?.data) {
              setSubmitObj({
                ...submitObj,
                imageUrl: res?.data?.data,
              });
            }
          }
        })
        .catch((err) => {
          setUploadImgLoading(false);
          console.log(err);
        });
    } else {
      alert('Only one file can be uploaded at once');
    }
  };

  return (
    <form className="flex gap-x-[20px] flex-wrap">
      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={'name'}
          label={'Name'}
          value={submitObj.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Dropdown
          name={'category'}
          value={submitObj.category}
          onChange={handleChange}
          list={categories}
          label="Category"
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Textarea
          name={'description'}
          label={'Description'}
          value={submitObj.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Upload
          onDrop={onDrop}
          url={submitObj.imageUrl}
          uploadImgLoading={uploadImgLoading}
        />
      </div>
    </form>
  );
};

export default ProductForm;
