import {
  Category,
  Dashboard,
  Inventory,
  Person,
  ShoppingCart,
} from '@mui/icons-material';

export const MAIL_SETTINGS = {
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

export const OTP_CONFIG = {
  digits: true,
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
};

export const protectedRoutes = [
  '/api/upload',
  '/api/order/cart',
  '/api/order/orderCompleted',
  '/api/order/deleteOrder',
  '/api/products/review',
  '/api/order/getOrder',
  '/api/order/userOrder',
];
export const publicRoutes = ['/api/categories', '/api/misc'];
export const authRoutes = ['/api/authentication/'];
export const frontendProtected = ['/profile'];

export const sideBarContent = [
  { name: 'Dashboard', icon: <Dashboard />, link: '/dashboard' },
  { name: 'Orders', icon: <ShoppingCart />, link: '/orders' },
  { name: 'Products', icon: <Inventory />, link: '/products' },
  { name: 'Categories', icon: <Category />, link: '/categories' },
  { name: 'Users', icon: <Person />, link: '/users' },
];

export const urls = {
  login: '/api/authentication/login',
  logout: '/api/authentication/logout',
};

export const OTP_LENGTH = 4;
