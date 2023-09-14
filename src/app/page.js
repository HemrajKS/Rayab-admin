"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useSession } from "next-auth/react";

export default function Home() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <>
      <h1>Welcome to home page</h1>
      {isLoggedIn ? "logged in" : "not logged in"}
    </>
  );
}
