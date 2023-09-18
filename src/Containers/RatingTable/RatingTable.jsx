import { Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import React from 'react';

const RatingTable = ({ data }) => {
  return (
    <div>
      {data && data.length > 0 && (
        <table className="table-auto  w-full mt-[20px]">
          <thead style={{ borderBottom: '6px solid #f7f8fa' }}>
            <tr className="   text-[#e47e52]  ">
              <th className="p-[20px] pb-[10px] text-left ">Sl. No.</th>
              <th className="p-[20px] pb-[10px] text-left ">Name</th>
              <th className="p-[20px] text-left pb-[10px]">Review</th>
              <th className="p-[20px] text-left pb-[10px]">Rating</th>
            </tr>
          </thead>

          <tbody>
            {data.map((rate, i) => {
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
                    {rate.user}
                  </td>
                  <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                    {rate.comment}
                  </td>
                  <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                    <div className="flex gap-[8px] items-center text-[#e47e52] text-bold text-[16px]">
                      <Rating
                        name="text-feedback"
                        value={rate.rating}
                        readOnly
                        precision={0.1}
                        emptyIcon={
                          <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                        }
                        sx={{
                          color: '#e47e52',
                          fontSize: '20px',
                        }}
                      />
                      <div>{rate.rating}</div>
                    </div>
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

export default RatingTable;
