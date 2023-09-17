import React from 'react';

const CategoryTable = ({ data }) => {
  console.log(data);
  return (
    <div className="">
      <table className="table-auto shadow-md bg-[white] rounded-[10px] ">
        <thead>
          <tr className="   text-[#e47e52]  ">
            <th className="p-[20px] pb-0 text-left ">Sl. No.</th>

            <th className="p-[20px] pb-0 text-left ">Name</th>
            <th className="p-[20px] pb-0 text-left  ">Description</th>
          </tr>
        </thead>

        <tbody>
          {data.map((cat, i) => {
            return (
              <tr key={i} className="mt-[5px] ">
                <td className="px-[20px] py-[10px] text-center">{i + 1}</td>
                <td className="px-[20px] py-[10px] text-left">{cat.name}</td>
                <td className="px-[20px] py-[10px] text-left ">
                  {cat.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
