import { Delete, Edit } from '@mui/icons-material';
import React from 'react';

const CategoryTable = ({ data, catObj }) => {
  return (
    <div>
      {data && data.length > 0 && (
        <table className="table-auto shadow-md bg-[white] rounded-[10px] w-full ">
          <thead style={{ borderBottom: '6px solid #f7f8fa' }}>
            <tr className="   text-[#e47e52]  ">
              <th className="p-[20px] pb-[10px] text-left ">Sl. No.</th>
              <th className="p-[20px] text-left pb-[10px]">Name</th>
              <th className="p-[20px] text-left pb-[10px]">Description</th>
              <th className="p-[20px] text-left pb-[10px]"></th>
              <th className="p-[20px] text-left pb-[10px]"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((cat, i) => {
              return (
                <tr
                  key={i}
                  className="mt-[5px]"
                  style={{
                    ...(i !== data.length - 1 && {
                      borderBottom: '4px solid #f7f8fa',
                    }),
                  }}
                >
                  <td className="px-[20px] py-[10px] text-center">{i + 1}</td>
                  <td className="px-[20px] py-[10px] text-left max-w-[320px] truncate">
                    {cat.name}
                  </td>
                  <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                    {cat.description}
                  </td>
                  <td>
                    <Edit
                      sx={{ color: '#2e4e9f', cursor: 'pointer' }}
                      onClick={() => {
                        catObj(cat, 'edit');
                      }}
                    />
                  </td>
                  <td>
                    <Delete
                      sx={{ color: '#f05454', cursor: 'pointer' }}
                      onClick={() => {
                        catObj(cat, 'delete');
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryTable;
