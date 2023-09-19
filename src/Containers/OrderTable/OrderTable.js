import React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useRouter } from 'next/navigation';

const OrderTable = ({ data }) => {
  const router = useRouter();

  return (
    <TableContainer
      sx={{ borderRadius: '14px' }}
      className="shadow-md bg-white"
    >
      <Table>
        <TableHead
          sx={{ position: 'sticky', top: 0 }}
          className="text-[#e47e52]"
        >
          <TableRow>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Order ID
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Country
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Products
            </TableCell>
            <TableCell
              sx={{
                borderBottom: '8px solid #f7f8fa',
                color: '#0b1c48',
                fontSize: '16px',
              }}
            >
              Date and Time
            </TableCell>
            <TableCell sx={{ borderBottom: '8px solid #f7f8fa' }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={row._id}
              sx={{ border: 'none', cursor: 'pointer' }}
              onClick={() => {
                router.push(`/orders/${row._id}`);
              }}
            >
              <TableCell
                className="w-full truncate "
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row._id}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  textAlign: 'center',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.totalPrice}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.phone1}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.email}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.address.country}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  textAlign: 'center',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.products.length}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  color: '#0b1c48',
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {new Date(row.orderDate).toLocaleString()}
              </TableCell>
              <TableCell
                className="w-full truncate"
                sx={{
                  borderBottom: 'none',
                  textTransform: 'capitalize',
                  color: {
                    pending: '#FFD700',
                    completed: 'green',
                    rejected: 'red',
                  }[row.status],
                  fontSize: '16px',
                  ...(i !== data.length - 1 && {
                    borderBottom: '6px solid #f7f8fa',
                  }),
                }}
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
