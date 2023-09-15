import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Rayab International - Ecommerce',
  description: 'Rayab International',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <AuthProvider>
        <body className={poppins.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
