import { Menu } from '@mui/icons-material';

const Header = ({ toggleDrawer }) => {
  return (
    <div className="flex" id="headerContainer">
      <Menu onClick={toggleDrawer} sx={{ cursor: 'pointer' }} />
      <h1>Header</h1>
    </div>
  );
};

export default Header;
