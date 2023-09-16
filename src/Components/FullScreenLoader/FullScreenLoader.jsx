import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function FullScreenLoader({ open }) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#e47e52', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" size={'64px'} />
      </Backdrop>
    </div>
  );
}
