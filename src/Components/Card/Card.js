import makeHttpRequest from '@/app/services/apiCall';
import React, { useEffect } from 'react';

const Card = ({ count, title, subTitle }) => {
  return (
    <div className="bg-white flex w-full max-w-[calc(33%-9px)] min-w-[320px] p-[16px] rounded-[14px] shadow-md items-center gap-2">
      <div className="text-[#e47e52] font-black text-[28px] bg-gray-100 rounded-[50%] h-[58px] w-[58px] items-center justify-center flex">
        <div>{count}</div>
      </div>
      <div>
        <div className="text-bold text-[20px]">{title}</div>
        <div className="text-thin text-slate-400 text-[15px] mt-[2px]">
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export default Card;
