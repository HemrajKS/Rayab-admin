import React from 'react';

const Button = ({ type, name }) => {
  return (
    <button
      type="submit"
      className="bg-[#0b1c48] hover:opacity-[0.85] text-white py-2 px-4 rounded-md mt-[16px] float-right w-full"
    >
      Login
    </button>
  );
};

export default Button;
