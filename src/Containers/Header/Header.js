import {
  AccountBoxRounded,
  AccountCircle,
  Logout,
  Menu,
} from '@mui/icons-material';

const Header = ({ toggleDrawer }) => {
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
        <div className="rounded-full mr-[18px] bg-white shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
          <AccountCircle sx={{ color: '#0b1c487c', fontSize: '30px' }} />
        </div>
        <div className="rounded-full bg-white shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
          <Logout sx={{ color: '#0b1c487c', fontSize: '26px' }} />
        </div>
      </div>
    </div>
  );
};

export default Header;
