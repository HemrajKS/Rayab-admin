import React from 'react';

const Button = ({ type, name, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={`bg-[#0b1c48] hover:opacity-[0.85] text-white py-2 px-4 rounded-md mt-[16px] float-right disabled:cursor-not-allowed, disabled:bg-[#0b1c48aa] h-[44px] ${
        type === 'button' && 'h-[37px] mt-[8px] w-[100px]'
      } w-[100%]`}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
