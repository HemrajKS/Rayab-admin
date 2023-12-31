export const MAIL_SETTINGS = {
  service: "gmail",
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
  "/api/upload",
  "/api/order/cart",
  "/api/order/orderCompleted",
  "/api/order/deleteOrder",
  "/api/products/review",
  "/api/order/getOrder",
  "/api/order/userOrder",
  "/api/dashboard",
  "/api/profile",
  "/api/profile/changePw",
];
export const publicRoutes = ["/api/categories", "/api/misc"];
export const authRoutes = ["/api/authentication/"];
export const frontendProtected = ["/profile"];

// export const sideBarContent = [
//   { name: 'Dashboard', icon: <Dashboard />, link: '/dashboard' },
//   { name: 'Orders', icon: <ShoppingCart />, link: '/orders' },
//   { name: 'Products', icon: <Inventory />, link: '/products' },
//   { name: 'Categories', icon: <Category />, link: '/categories' },
//   { name: 'Users', icon: <Person />, link: '/users' },
// ];

export const sideBarContent = [
  { name: "Dashboard", icon: "Dashboard", link: "/dashboard" },
  { name: "Orders", icon: "ShoppingCart", link: "/orders" },
  { name: "Products", icon: "Inventory", link: "/products" },
  { name: "Categories", icon: "Category", link: "/categories" },
  { name: "Landing", icon: "Home", link: "/home" },
  { name: "Users", icon: "Person", link: "/users" },
];

export const urls = {
  login: "/api/authentication/login",
  logout: "/api/authentication/logout",
  dashboard: "/api/dashboard",
  orders: "/api/order/getOrder",
  products: "/api/products",
  categories: "/api/categories",
  deleteCategories: "/api/admin/Categories/delete",
  editCategories: "/api/admin/Categories/update",
  addCategories: "/api/admin/Categories/add",
  updateProduct: "/api/admin/Products/update",
  postProduct: "/api/admin/Products/add",
  deleteProduct: "/api/admin/Products/delete",
  getOrders: "/api/order/getOrder",
  deleteOrder: "/api/order/deleteOrder",
  orderStatus: "/api/order/orderCompleted",
  users: "/api/admin/Users",
  profile: "/api/profile",
  changePassword: "/api/profile/changePw",
  home: "/api/home",
};

export const OTP_LENGTH = 4;
