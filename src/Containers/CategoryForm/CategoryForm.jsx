import Button from '@/Components/Button/Button';
import Input from '@/Components/Input/Input';
import Textarea from '@/Components/Textarea/Textarea';
import { Close } from '@mui/icons-material';
import React, { useState } from 'react';

const CategoryForm = ({ editCategory, onChange, deleteSubCat }) => {
  const [subCat, setSubCat] = useState('');
  return (
    <form className="max-h-[80vh] overflow-auto">
      <div className="text-bold mb-[20px]">Category Form</div>
      <Input
        label={'Name'}
        value={editCategory.name}
        onChange={onChange}
        name={'name'}
      />
      <Textarea
        label={'Description'}
        value={editCategory.description}
        onChange={onChange}
        name={'description'}
      />
      <div className="flex items-end gap-[10px]">
        <Input
          label={'Sub Categories'}
          value={subCat}
          onChange={(e) => {
            setSubCat(e.target.value);
          }}
          name={'subCategory'}
        />
        <span className="mb-[20px]">
          <Button
            type={'submit'}
            name={'Add'}
            onClick={(e) => {
              e.preventDefault();
              e.target.name = 'subCategory';
              e.target.value = subCat;
              onChange(e);
            }}
          />
        </span>
      </div>
      <div>
        {editCategory?.subCategories?.map((subCat, i) => {
          return (
            <div
              key={i}
              className="pl-[14px]  flex justify-between gap-[20px] pr-[14px]"
            >
              <span>
                {i + 1}. {subCat}
              </span>{' '}
              <span
                onClick={() => {
                  deleteSubCat(i);
                }}
                className="cursor-pointer text-[#e47e52]"
              >
                <Close />
              </span>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default CategoryForm;
