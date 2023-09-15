"use client";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/contexts/PrivateRoute";
import { useSession } from "next-auth/react";

export default function Home() {
  const { isLoggedIn} = useAuth();

  return (
    <PrivateRoute>
      <h1>Welcome to home page</h1>
      {isLoggedIn ? "logged in" : "not logged in"}
    </PrivateRoute>
  );
}
