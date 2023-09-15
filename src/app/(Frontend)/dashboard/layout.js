import { useAuth } from "@/contexts/AuthContext";

export default function Layout({ children }) {
  return (
    <>
      <h1>Header</h1>
      {children}
      <h1>Footer</h1>
    </>
  );
}
