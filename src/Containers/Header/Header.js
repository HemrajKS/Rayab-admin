import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { AccountCircle, Logout, Menu } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { lazy, useState } from 'react';

const BasicModal = lazy(() => import('@/Components/Modal/Modal'));

const Header = ({ toggleDrawer }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const logoutFn = () => {
    setLoading(true);
    makeHttpRequest(urls.logout, 'get')
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-[80px] px-[25px] items-center justify-between">
      <div className="flex items-center">
        <div className="rounded-full mr-[18px] bg-white shadow-md w-[50px] h-[50px] cursor-pointer flex items-center justify-center">
          <Menu
            onClick={toggleDrawer}
            sx={{ color: '#0b1c487c', fontSize: '26px' }}
          />
        </div>
        <div className="font-black text-[24px] text-[#0b1c48]">
          Rayab <span className="font-thin text-[#e47e52]">International</span>
        </div>
      </div>
      <div className="flex">
        <div
          className="rounded-full mr-[18px] bg-white shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            router.push('/profile');
          }}
        >
          <AccountCircle sx={{ color: '#0b1c487c', fontSize: '30px' }} />
        </div>
        <div className="rounded-full bg-white shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
          <Logout
            sx={{ color: '#0b1c487c', fontSize: '26px' }}
            onClick={handleOpen}
          />
        </div>
        <BasicModal
          open={open}
          cancel={handleClose}
          func={logoutFn}
          message={'Are you sure you want to log out?'}
        />
        <FullScreenLoader open={loading} />
      </div>
    </div>
  );
};

export default Header;
