import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  border: 'none',
  outline: 'none',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
};

export default function BasicModal({
  open,
  handleClose,
  message,
  cancel,
  func,
  yesBtn,
  noBtn,
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="text-[#0b1c48] text-[20px] text-center mb-[24px]">
            {message}
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                cancel();
                func();
              }}
              className="mr-4 shadow-lg spread-2 text-white text-[18px] rounded-[6px] cursor-pointer w-[100px] bg-[#e47e52] flex items-center justify-center py-1 hover:bg-[#e47e52ba]"
            >
              {yesBtn ? yesBtn : 'Yes'}
            </div>
            <div
              className=" text-[#0b1c48] hover:bg-[#0b1c4812] text-[18px] shadow-lg rounded-[6px] cursor-pointer w-[100px] bg-[#0b1c482f] flex items-center justify-center py-1"
              onClick={cancel}
            >
              {noBtn ? noBtn : 'No'}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
