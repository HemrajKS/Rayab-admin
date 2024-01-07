import Button from '@/Components/Button/Button';
import Input from '@/Components/Input/Input';
import Textarea from '@/Components/Textarea/Textarea';
import React, { useState } from 'react';

const CategoryForm = ({ editCategory, onChange }) => {
  const [subCat, setSubCat] = useState('');
  return (
    <form>
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
      <form className="flex items-end gap-[10px]">
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
        {JSON.stringify(editCategory)}
      </form>
    </form>
  );
};

export default CategoryForm;
