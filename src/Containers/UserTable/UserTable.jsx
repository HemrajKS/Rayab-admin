import { Check, Close, Info } from '@mui/icons-material';
import React from 'react';

const UserTable = ({ data, infoClick }) => {
  return (
    <div>
      {data && data.length > 0 && (
        <table className="table-auto shadow-md bg-[white] rounded-[10px] w-full ">
          <thead style={{ borderBottom: '6px solid #f7f8fa' }}>
            <tr className="   text-[#e47e52]  ">
              <th className="p-[20px] pb-[10px] text-left ">Sl. No.</th>
              <th className="p-[20px] text-left pb-[10px]">User Name</th>
              <th className="p-[20px] text-left pb-[10px]">First Name</th>
              <th className="p-[20px] text-left pb-[10px]">Last Name</th>
              <th className="p-[20px] text-left pb-[10px]">Email Id</th>
              <th className="p-[20px] text-left pb-[10px]">Created On</th>
              <th className="p-[20px] text-left pb-[10px]">Admin</th>
              <th className="p-[20px] text-left pb-[10px]">Active</th>
              <th className="p-[20px] text-left pb-[10px]">Orders</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.reverse().map((user, i) => {
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
                      {user.username}
                    </td>
                    <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                      {user.firstName}
                    </td>
                    <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                      {user.lastName}
                    </td>
                    <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                      {user.email}
                    </td>
                    <td className="px-[20px] py-[10px] text-left max-w-[500px] truncate">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-[20px] py-[10px] text-center max-w-[500px] truncate ">
                      {user.isAdmin ? (
                        <Check sx={{ color: 'green' }} />
                      ) : (
                        <Close sx={{ color: 'red' }} />
                      )}
                    </td>
                    <td className="px-[20px] py-[10px] text-center max-w-[500px] truncate">
                      {user.isActive ? (
                        <Check sx={{ color: 'green' }} />
                      ) : (
                        <Close sx={{ color: 'red' }} />
                      )}
                    </td>
                    <td className="px-[20px] py-[10px] text-center max-w-[500px] truncate">
                      {user.orders && user.orders.length > 0
                        ? user.orders.length
                        : 0}
                      <Info
                        sx={{
                          cursor: 'pointer',
                          color: '#e47e52',
                          marginLeft: '6px',
                        }}
                        onClick={() => {
                          infoClick(user.orders);
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

export default UserTable;
