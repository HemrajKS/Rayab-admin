"use client";

import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/contexts/PrivateRoute";

export default function Layout({ children }) {

  return (
    <PrivateRoute>
      <main>{children}</main>
    </PrivateRoute>
  );
}
