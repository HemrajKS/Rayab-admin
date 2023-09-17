import React from 'react';

const TabBtns = ({ tabs, active, tabClick }) => {
  return (
    <div className="flex shadow-md bg-white rounded-[6px] ">
      {tabs.map((tab, i) => {
        return (
          <div
            key={tab}
            className={`px-[10px] py-[4px] w-[110px] text-center cursor-pointer capitalize ${
              tabs.length - 1 !== i &&
              'border-r-gray-200 border-r-solid border-r-2'
            } ${
              active === tab &&
              `bg-[#e47e52] text-white ${
                i === 0 && 'rounded-tl-[6px] rounded-bl-[6px]'
              } ${i === tabs.length - 1 && 'rounded-br-[6px] rounded-tr-[6px]'}`
            }`}
            onClick={() => {
              tabClick(tab);
            }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

export default TabBtns;
