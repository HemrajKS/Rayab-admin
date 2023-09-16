'use client';
import PrivateRoute from '@/contexts/PrivateRoute';
import { Suspense, lazy, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Menu } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

const Header = lazy(() => import('@/Containers/Header/Header'));
const Sidebar = lazy(() => import('@/Containers/Sidebar/Sidebar'));

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { isLoggenIn } = useAuth();

  return (
    <PrivateRoute>
      <div className="relative bg-[#F7F8FA] h-[100vh] max-w-[1480px] mx-[auto]">
        <div className="flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <Header toggleDrawer={toggleDrawer} />
          </Suspense>
          <div className="flex flex-row ">
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar
                open={open}
                toggleDrawer={toggleDrawer}
                sx={{ cursor: 'pointer' }}
              />
            </Suspense>
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
