import React from 'react';

const Button = ({ type, name, disabled }) => {
  return (
    <button
      type={type}
      className="bg-[#0b1c48] hover:opacity-[0.85] text-white py-2 px-4 rounded-md mt-[16px] float-right w-full disabled:cursor-not-allowed, disabled:opacity-50"
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
