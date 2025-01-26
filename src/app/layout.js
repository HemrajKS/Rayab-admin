import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Eagle Eye Worldwide - Admin",
  description: "Eagle Eye Worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      // <head></head>
      // <AuthProvider>
      //   <body className={poppins.className}>{children}</body>
      // </AuthProvider>

    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; color: #333;">
  <div>
    <h1 style="font-size: 2.5rem; margin-bottom: 10px;">Website Can't Be Accessed</h1>
    <p style="font-size: 1.2rem; color: #555; margin: 5px 0;">The website you are trying to reach is currently unavailable.</p>
    <p style="font-size: 1rem; color: #888; margin-top: 15px;">Possible reason: The hosting plan may have expired.</p>
  </div>
</div>
    </html>
  );
}
