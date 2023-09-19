import { Close } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  border: 'none',
  outline: 'none',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
};

const UserModal = ({ orders, open, closeModal }) => {
  const router = useRouter();
  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        style={style}
        sx={{ background: 'white', position: 'relative', padding: '16px' }}
      >
        <div className="text-[#0b1c48] text-center mb-[16px]">
          <div className="text-[20px] font-bold ">Order Ids</div>
          <div className="text-[#e47e52] text-[14px]">
            Click on the order ID to navigate to the orders page.
          </div>
        </div>
        <div
          className={
            'flex flex-col items-start text-[#0b1c48] max-h-[430px] overflow-auto text-[18px]'
          }
        >
          {orders && orders.length > 0 ? (
            orders.reverse().map((order, i) => (
              <div
                key={i}
                onClick={() => {
                  router.push(`/orders/${order}`);
                }}
                className="underline cursor-pointer pb-[8px]"
              >
                {i + 1}. {order}
              </div>
            ))
          ) : (
            <div>This user has not placed any orders yet.</div>
          )}
        </div>
        <div
          className="text-[#0b1c48] text-[20px] text-center mb-[24px] absolute top-[10px] right-[10px] cursor-pointer"
          onClick={closeModal}
        >
          <Close sx={{ color: '#0b1c48' }} />
        </div>
      </Box>
    </Modal>
  );
};

export default UserModal;
