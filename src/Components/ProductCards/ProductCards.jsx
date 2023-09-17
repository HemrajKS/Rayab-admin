import React from 'react';

const ProductCards = ({ data, index }) => {
  return (
    <div
      key={index}
      className="bg-white flex w-[100%] max-w-[calc(20%-16px)] min-w-[200px] p-[16px] rounded-[14px] shadow-md items-center"
    >
      ProductCards
    </div>
  );
};

export default ProductCards;
