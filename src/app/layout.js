import "./globals.css";
import { Inter } from "next/font/google";
import { Provider as AuthProvider } from "next-auth/react";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rayab International - Ecommerce",
  description: "Rayab International",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextAuthProvider> */}
          {children}
          {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
