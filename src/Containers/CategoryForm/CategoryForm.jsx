import Input from '@/Components/Input/Input';
import Textarea from '@/Components/Textarea/Textarea';
import React from 'react';

const CategoryForm = ({ editCategory, onChange }) => {
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
    </form>
  );
};

export default CategoryForm;
