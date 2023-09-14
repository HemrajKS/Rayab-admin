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
  "/api/order/userOrder"
];
export const publicRoutes = ["/api/categories", "/api/misc"];
export const authRoutes = ["/api/auth/"];

export const OTP_LENGTH = 4;
